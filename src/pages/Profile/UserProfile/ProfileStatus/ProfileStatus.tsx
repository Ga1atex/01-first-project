import React, { ChangeEvent } from 'react';
import styles from './ProfileStatus.module.scss';
import classNames from 'classnames';

type PropsType = {
  editMode: boolean;
  status: string;
  onStatusChange: (e: ChangeEvent<HTMLInputElement>) => void;
  activateEditMode: () => void;
  deactivateEditMode: () => void;
  isOwner: boolean;
};

export function ProfileStatus(props: PropsType) {
  const {
    editMode,
    onStatusChange,
    deactivateEditMode,
    activateEditMode,
    status,
    isOwner,
  } = props;

  const statusClassName = classNames(styles.status, {
    [styles.isOwner]: isOwner,
  });
  return (
    <div>
      {editMode ? (
        <div className="">
          <input
            name=""
            id=""
            type="text"
            value={status}
            onChange={onStatusChange}
            onBlur={deactivateEditMode}
            autoFocus
          />
        </div>
      ) : (
        <>
          <span>Status: </span>
          <span className={statusClassName} onClick={activateEditMode}>
            {status || 'Click to set status'}
          </span>
        </>
      )}
    </div>
  );
}

export default ProfileStatus;
