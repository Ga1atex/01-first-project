import React from "react";
import { connect } from "react-redux";
import ProfileStatus from "./ProfileStatus";
import { getProfileStatus, updateProfileStatus } from "../../../redux/profileReducer";

class ProfileStatusContainer extends React.Component {
  componentDidMount() {
    const userId = this.props.userId || 22195;
    this.props.getProfileStatus(userId);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.status !== this.props.status) {
      this.setState({
        status: this.props.status
      })
    }
  }
  state = {
    editMode: false,
    status: this.props.status
  };

  activateEditMode = () => {
    this.setState({
      editMode: true
    });
  };

  deactivateEditMode = () => {
    this.setState({
      editMode: false
    });
    this.props.updateProfileStatus(this.state.status);
  };

  onStatusChange = (e) => {
    this.setState({
      status: e.currentTarget.value
    });
  }

  render() {
    return (
      <ProfileStatus {...this.props} state={this.state} onStatusChange={this.onStatusChange} activateEditMode={this.activateEditMode} deactivateEditMode={this.deactivateEditMode} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    status: state.profilePage.status,
  };
};

export default connect(mapStateToProps, {
  getProfileStatus,
  updateProfileStatus
})(ProfileStatusContainer);
