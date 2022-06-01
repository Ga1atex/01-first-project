import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateProfileStatus } from "../../../../redux/reducers/profileReducer/profileThunks";
import ProfileStatus from "./ProfileStatus";

const ProfileStatusContainer = (props: OwnPropsType) => {
  const { status, isOwner } = props;

  const dispatch = useDispatch();
  const [editMode, setEditMode] = useState(false);
  const [profileStatus, setProfileStatus] = useState(status);

  useEffect(() => {
    setProfileStatus(status)
  }, [status])

  const activateEditMode = () => {
    if (isOwner) {
      setEditMode(true);
    }
  };
  const deactivateEditMode = () => {
    setEditMode(false);
    dispatch(updateProfileStatus(profileStatus));
  };

  const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileStatus(e.currentTarget.value);
  };
  if (!status && !isOwner) {
    return null
  }
  return (
    <ProfileStatus {...props} editMode={editMode} status={profileStatus} onStatusChange={onStatusChange} activateEditMode={activateEditMode} deactivateEditMode={deactivateEditMode} isOwner={isOwner} />
  );
};

type OwnPropsType = {
  status: string
  isOwner: boolean
  // userId: number
}
// type MapStatePropsType = {

// }
// type MapDispatchPropsType = {
//   getProfileStatus: (userId: number) => void
//   updateProfileStatus: (newStatus: string) => void
// }
// type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType

// const mapStateToProps = (state: AppStateType) => {
//   return {
// authorizedUserId: state.auth.userId,
// status: state.profilePage.status
//   };
// };

// export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(null, {
//   getProfileStatus,
//   updateProfileStatus
// })(ProfileStatusContainer);

export default ProfileStatusContainer;
