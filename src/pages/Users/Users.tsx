
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Preloader from '../../components/common/Preloader/Preloader';
import { toggleFollow } from '../../redux/reducers/userReducer/usersReducer';
import { UserType } from '../../types/types';
import User from './User';
import styles from './Users.module.scss';


type PropsType = {
  usersData: UserType[]
  isFetching: boolean
  followingInProgress: number[]
}

export const Users: React.FC<PropsType> = ({ isFetching, usersData, followingInProgress }) => {
  const dispatch = useDispatch()

  const toggleFollowCB = useCallback((followed: boolean, id: number) => {
    dispatch(toggleFollow(followed, id))
  }, [])

  if (isFetching) {
    return <Preloader />
  }

  return (
    <>
      <div className={styles.users}>
        {
          usersData.map(user => {
            return <User key={user.id} user={user} followingInProgress={followingInProgress} toggleFollow={toggleFollowCB} />;
          })
        }
      </div>
    </>
  );
};
