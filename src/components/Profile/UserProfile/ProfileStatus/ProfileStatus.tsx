import React, { ChangeEvent } from "react";

type PropsType = {
  editMode: boolean
  status: string
  onStatusChange: (e: ChangeEvent<HTMLInputElement>) => void
  activateEditMode: () => void
  deactivateEditMode: () => void
}

export function ProfileStatus(props: PropsType) {
  return (
    <div>
      {props.editMode
        ? <div className=""><input name="" id="" type="text" value={props.status} onChange={props.onStatusChange} onBlur={props.deactivateEditMode} autoFocus /></div>
        : <span className="" onClick={props.activateEditMode}>{props.status || 'Status'}</span>}
    </div>
  );
}

export default ProfileStatus;
