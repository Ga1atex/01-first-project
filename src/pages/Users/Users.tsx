import { List, Skeleton } from 'antd';
import React, { useCallback } from 'react';
import { toggleFollow } from '../../redux/reducers/usersReducer/usersThunks';
import { UserType } from '../../types/types';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';
import User from './User';

type PropsType = {
  usersData: UserType[];
  isFetching: boolean;
  followingInProgress: number[];
  isAuth: boolean;
};

export const Users: React.FC<PropsType> = React.memo(
  ({ isFetching, usersData, followingInProgress, isAuth }) => {
    const dispatch = useAppDispatch();

    const avatarSize = 60;

    const toggleFollowCB = useCallback(
      (followed: boolean, userId: number) => {
        dispatch(toggleFollow({ followed, userId }));
      },
      [dispatch]
    );

    return (
      <Skeleton
        loading={!usersData.length && isFetching}
        active
        avatar={{ size: avatarSize }}
      >
        <List
          grid={{ gutter: 16, column: 2, xs: 1 }}
          dataSource={usersData}
          renderItem={(user) => {
            return (
              <List.Item key={user.id}>
                <Skeleton
                  loading={isFetching}
                  active
                  avatar={{ shape: 'circle', size: avatarSize }}
                  paragraph={{ rows: 1 }}
                >
                  <User
                    user={user}
                    followingInProgress={followingInProgress}
                    toggleFollow={toggleFollowCB}
                    isAuth={isAuth}
                    avatarSize={avatarSize}
                  />
                </Skeleton>
              </List.Item>
            );
          }}
        ></List>
      </Skeleton>
    );
  }
);
