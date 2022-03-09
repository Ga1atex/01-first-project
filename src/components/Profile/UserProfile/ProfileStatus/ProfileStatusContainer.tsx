import React, { useState, useEffect, ChangeEvent } from "react";
import { connect } from "react-redux";
import ProfileStatus from "./ProfileStatus";
import { getProfileStatus, updateProfileStatus } from "../../../../redux/profileReducer";
import { AppStateType } from "../../../../redux/redux-store";

type MapStatePropsType = {

}
type OwnPropsType = {
  status: string
  isOwner: boolean
  // userId: number
}
type MapDispatchPropsType = {
  getProfileStatus: (userId: number) => void
  updateProfileStatus: (newStatus: string) => void
}
type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

const ProfileStatusContainer = (props: PropsType) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  // const userId = props.userId || props.authorizedUserId;
  // props.getProfileStatus(userId);

  useEffect(() => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    if (props.isOwner) {
      setEditMode(true);
    }
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateProfileStatus(status);
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStatus(e.currentTarget.value);
  };

  return (
    <ProfileStatus {...props} editMode={editMode} status={status} onStatusChange={onStatusChange} activateEditMode={activateEditMode} deactivateEditMode={deactivateEditMode} />
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    // authorizedUserId: state.auth.userId,
    // status: state.profilePage.status
  };
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
  getProfileStatus,
  updateProfileStatus
})(ProfileStatusContainer);
