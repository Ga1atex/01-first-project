import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RouteNames } from '../../components/AppRoutes';
import { AppStateType } from '../../redux/store';

const mapStateToPropsForRedirect = (state: AppStateType) => {
  return {
    isAuth: state.auth.isAuth,
  };
};
type MapStateToPropsType = ReturnType<typeof mapStateToPropsForRedirect>;

//Use "extends unknown" or ", " on the generic parameter to hint the compiler that it's a generic
export const withAuthRedirect = <WCP,>(
  WrappedComponent: React.ComponentType<WCP>
) => {
  const RedirectComponent: React.FC<MapStateToPropsType> = (props) => {
    const { isAuth, ...componentProps } = props;
    if (!isAuth) return <Navigate replace to={RouteNames.LOGIN} />;

    return <WrappedComponent {...(componentProps as WCP)} />;
  };

  const ConnectedAuthRedirectComponent = connect<
    MapStateToPropsType,
    {},
    WCP,
    AppStateType
  >(
    mapStateToPropsForRedirect,
    {}
  )(RedirectComponent);

  return ConnectedAuthRedirectComponent;
};
