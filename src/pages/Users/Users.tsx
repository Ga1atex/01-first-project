
import { List, Skeleton } from 'antd';
import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Preloader from '../../components/common/Preloader/Preloader';
import { toggleFollow } from "../../redux/reducers/usersReducer/usersThunks";
import { UserType } from '../../types/types';
import User from './User';
import styles from './Users.module.scss';


type PropsType = {
  usersData: UserType[]
  isFetching: boolean
  followingInProgress: number[],
  isAuth: boolean;
}

export const Users: React.FC<PropsType> = ({ isFetching, usersData, followingInProgress, isAuth }) => {
  const dispatch = useDispatch()

  const avatarSize = 60;

  const toggleFollowCB = useCallback((followed: boolean, id: number) => {
    dispatch(toggleFollow(followed, id))
  }, [dispatch])

  // if (isFetching) {
  //   return <Preloader />
  // }

  return (
    <Skeleton loading={!usersData.length && isFetching} active avatar={{ size: avatarSize }}>
      <List grid={{ gutter: 16, column: 2, xs: 1 }} dataSource={usersData} renderItem={user => {
        return (
          <List.Item key={user.id}>
            <Skeleton loading={isFetching} active avatar={{ shape: 'circle', size: avatarSize }} paragraph={{ rows: 1 }}>
              <User user={user} followingInProgress={followingInProgress} toggleFollow={toggleFollowCB} isAuth={isAuth} avatarSize={avatarSize} />
            </Skeleton>
          </List.Item>
        )
      }}>
      </List>
    </Skeleton>
  );
};
