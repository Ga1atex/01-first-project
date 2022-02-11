import React from "react";

export function ProfileStatus(props) {
  return (
    <div>
      {props.editMode
        ? <div className=""><input name="" id="" type="text" value={props.status} onChange={props.onStatusChange} onBlur={props.deactivateEditMode} autoFocus /></div>
        : <span className="" onClick={props.activateEditMode}>{props.status || 'Status'}</span>}
    </div>
  );
}

export default ProfileStatus;
