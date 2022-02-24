import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import withRouter from '../../hoc/withRouter';
import { getUserProfile, getProfileStatus, savePhoto, saveProfile } from '../../redux/profileReducer';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';
import Profile from './Profile';

type MapPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void
  getProfileStatus: (userId: number | null) => void
  savePhoto: (file: File) => void
  saveProfile:(profile: ProfileType) => void
}

type PathParamsType = {
  router: any
  authorizedUserId: number
}

type PropsType = MapPropsType & MapDispatchPropsType & PathParamsType;

class ProfileContainer extends React.Component<PropsType> {
  userId = this.props.router.params.userId || this.props.authorizedUserId
  // todo: get rid of withrouter, change from classComponent to FC
  componentDidMount() {
    if (this.userId) {
      this.props.getUserProfile(this.userId);
      this.props.getProfileStatus(this.userId);
    } else {
      console.error('ID should exist un URI params or in state')
    }
  }
  componentDidUpdate(prevProps: PropsType, prevState: PropsType) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.props.getUserProfile(this.props.authorizedUserId);
      this.props.getProfileStatus(this.props.authorizedUserId);
    }
  }

  render() {
    return (
      <Profile isOwner={!this.props.router.params.userId} profile={this.props.profile}status={this.props.status} savePhoto={this.props.savePhoto} profileUpdateStatus={this.props.profileUpdateStatus} saveProfile={this.props.saveProfile}/>
      //  userId = { this.userId }
      // {...this.props; }
      );
  }
}

const mapStateToProps = (state: AppStateType) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
    status: state.profilePage.status,
    profileUpdateStatus: state.profilePage.profileUpdateStatus
  };
};

export default compose<React.ComponentType>(
  withAuthRedirect,
  connect(mapStateToProps, {
    getUserProfile,
    getProfileStatus,
    savePhoto,
    saveProfile
  }),
  withRouter,
)(ProfileContainer);
