import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {setAuthUserData} from '../../redux/authReducer'
import { authAPI, profileAPI } from '../../api/api';

class HeaderContainer extends React.Component {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    authAPI.getAuthData()
      .then(data => {
        if (data.resultCode === 0) {
          const { id, email, login } = data.data;
          // this.props.setAuthUserData(id, email, login);
          if (login) {
            profileAPI.getProfile(id)
              .then(data => {
                this.props.setAuthUserData(id, email, login, data.fullName, data.photos.small);
              });
          }
        }
      }
      );

  }

  render() {
    return (
      <Header {...this.props}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    fullName: state.auth.fullName,
    photoSmall: state.auth.photoSmall
  }
}

export default connect(mapStateToProps, {
  setAuthUserData
})(HeaderContainer);
