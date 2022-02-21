import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import {logout} from '../../redux/authReducer'
import { AppStateType } from '../../redux/redux-store';

type MapStatePropsType = {
    isAuth: boolean,
    login: null | string
    fullName: null | string
    photoSmall: null | string
}

type MapDispatchPropsType = {
  logout: () => void
}

type PropsType = MapStatePropsType & MapDispatchPropsType

class HeaderContainer extends React.Component<PropsType> {
  render() {
    return (
      <Header {...this.props}/>
    );
  }
}

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
  return {
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    fullName: state.auth.fullName,
    photoSmall: state.auth.photoSmall
  }
}

export default connect<MapStatePropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
  logout
})(HeaderContainer);
