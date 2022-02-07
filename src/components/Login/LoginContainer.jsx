import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {getAuthUserData} from '../../redux/authReducer'
import { authAPI, usersAPI } from '../../api/api';

class HeaderContainer extends React.Component {
  componentDidMount() {
    // this.props.toggleIsFetching(true);
    this.props.getAuthUserData()

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
  getAuthUserData
})(HeaderContainer);
