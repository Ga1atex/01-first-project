import React from "react";
import ProfileStatus from "./ProfileStatus";

class ProfileStatusContainer extends React.Component {
  componentDidMount() {
    console.log(this.props)
    // const userId = this.props.router.params.userId || 2;
    // this.props.getProfileStatus(userId);
  }
  state = {
    editMode: false,
  };

  activateEditMode = () => {
    this.setState({
      editMode: true
    })
  }

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
  }

  render() {
    return (
      <ProfileStatus {...this.props} state={this.state}/>
    );
  }
}

export default ProfileStatusContainer;
