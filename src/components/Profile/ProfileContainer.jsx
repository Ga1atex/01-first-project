import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import withRouter from '../../hoc/withRouter';
import { getUserProfile } from '../../redux/profileReducer';
import Login from '../Login/Login';
import Profile from './Profile';

class ProfileContainer extends React.Component {
  userId = this.props.router.params.userId || this.props.authorizedUserId
  componentDidMount() {
    if (this.userId) {
      this.props.getUserProfile(this.userId);
      // this.props.getProfileStatus(userId);
    }
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} userId={this.userId}/>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    authorizedUserId: state.auth.userId,
  };
};

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    getUserProfile,
    // getProfileStatus
  }),
  withRouter,
)(ProfileContainer);
