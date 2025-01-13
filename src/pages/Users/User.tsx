import { Button, Space } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import UserAvatar from '../../components/common/UserAvatar/UserAvatar';
import { UserType } from '../../types/types';
import { RouteNames } from '../../components/AppRoutes';
import { useSelector } from 'react-redux';
import { selectAuthorizedUserId } from '../../redux/reducers/authReducer/authSelectors';

type PropsType = {
  user: UserType;
  followingInProgress: Array<number>;
  toggleFollow: (followed: boolean, userId: number) => void;
  isAuth: boolean;
  avatarSize: number;
};

const User: React.FC<PropsType> = ({
  user,
  followingInProgress,
  toggleFollow,
  isAuth,
  avatarSize,
  ...props
}) => {
  const followHandler = () => {
    toggleFollow(user.followed, user.id);
  };

  const authId = useSelector(selectAuthorizedUserId);

  return (
    <div key={user.id} className="users__item user">
      <Space className="">
        <NavLink className="" to={`${RouteNames.PROFILE}/${user.id}`}>
          <UserAvatar
            src={user.photos.small}
            alt={user.name + "'s avatar"}
            size={avatarSize}
          />
        </NavLink>
        {isAuth && (
          <Button
            disabled={
              user.id === authId ||
              followingInProgress.some((id) => id === user.id)
            }
            className=""
            onClick={followHandler}
          >
            {user.followed ? 'Unfollow' : 'Follow'}
          </Button>
        )}
      </Space>
      <div className="user__info">
        <Space className="user__description">
          <div className="user__name">{user.name}</div>
          {/* <div className="user__status">{user.status}</div> */}
        </Space>
      </div>
    </div>
  );
};

export default User;
