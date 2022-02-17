import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import ProfileStatus from "./ProfileStatus";
import { getProfileStatus, updateProfileStatus } from "../../../../redux/profileReducer";

const ProfileStatusContainer = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  // const userId = props.userId || props.authorizedUserId;
  // props.getProfileStatus(userId);

  useEffect(() => {
    setStatus(props.status)
  },[props.status])

  const activateEditMode = () => {
    setEditMode(true);
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateProfileStatus(status);
  };

  const onStatusChange = (e) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <ProfileStatus {...props} editMode={editMode} status={status} onStatusChange={onStatusChange} activateEditMode={activateEditMode} deactivateEditMode={deactivateEditMode} />
  );
};

const mapStateToProps = (state) => {
  return {
    // authorizedUserId: state.auth.userId,
    // status: state.profilePage.status
  };
};

export default connect(mapStateToProps, {
  getProfileStatus,
  updateProfileStatus
})(ProfileStatusContainer);
