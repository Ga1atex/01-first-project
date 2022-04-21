import React, { ChangeEvent } from "react";

type PropsType = {
  editMode: boolean
  status: string
  onStatusChange: (e: ChangeEvent<HTMLInputElement>) => void
  activateEditMode: () => void
  deactivateEditMode: () => void
}

export function ProfileStatus(props: PropsType) {
  const { editMode, onStatusChange, deactivateEditMode, activateEditMode, status } = props;

  return (
    <div>
      {editMode
        ? <div className=""><input name="" id="" type="text" value={status} onChange={onStatusChange} onBlur={deactivateEditMode} autoFocus /></div>
        : <span className="" onClick={activateEditMode}>{status || 'Status'}</span>}
    </div>
  );
}

export default ProfileStatus;
