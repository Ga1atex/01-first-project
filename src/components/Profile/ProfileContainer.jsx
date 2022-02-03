import React from 'react';
import { connect } from 'react-redux';
import { useLocation, useMatch, useNavigate, useParams } from 'react-router-dom';
import { profileAPI} from '../../api/api';
import { setUserProfile } from '../../redux/profileReducer';
import Profile from './Profile';

class ProfileContainer extends React.Component {
  componentDidMount() {
    // const userId = this.props.match.params.userId || 2;
    const userId = this.props.router.params.userId || 2;
    profileAPI.getProfile(userId)
      .then(data => {
        this.props.setUserProfile(data);
      }
      );
  }

  render() {
    return (
      <Profile {...this.props} profile={this.props.profile} />
    );
  }
}
const mapStateToProps = (state) => {
  return {
    profile: state.profilePage.profile
  };
};

// function withRouter(Component) {
//   return function (props) {
//     const match = useMatch('/profile/:userId/');
//     return (
//       <Component
//         {...props}
//         match={match}
//       />
//     );
//   }
// }

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}

const withUrlDataContainerComponent = withRouter(ProfileContainer);

export default connect(mapStateToProps, {
  setUserProfile
})(withUrlDataContainerComponent);
