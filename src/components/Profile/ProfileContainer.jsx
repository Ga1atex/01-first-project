import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import withRouter from '../../hoc/withRouter';
import { getUserProfile, getProfileStatus, savePhoto, saveProfile } from '../../redux/profileReducer';
import Profile from './Profile';

class ProfileContainer extends React.Component {
  userId = this.props.router.params.userId || this.props.authorizedUserId

  componentDidMount() {
    if (this.userId) {
      this.props.getUserProfile(this.userId);
      this.props.getProfileStatus(this.userId);
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.router.params.userId !== prevProps.router.params.userId) {
      this.props.getUserProfile(this.props.authorizedUserId);
      this.props.getProfileStatus(this.props.authorizedUserId);
    }
  }
  render() {
    return (
      <Profile isOwner={!this.props.router.params.userId} profile={this.props.profile} userId={this.userId} status={this.props.status} savePhoto={this.props.savePhoto} profileUpdateStatus={this.props.profileUpdateStatus} saveProfile={this.props.saveProfile}/>
      // {...this.props; }
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
    status: state.profilePage.status,
    profileUpdateStatus: state.profilePage.profileUpdateStatus
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    getUserProfile,
    getProfileStatus,
    savePhoto,
    saveProfile
  }),
  withRouter,
)(ProfileContainer);
