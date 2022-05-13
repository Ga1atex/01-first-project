import { Avatar, Button, Space } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../assets/images/user.png';
import { UserType } from '../../types/types';
import { RouteNames } from '../../utils/redirectRules';

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  toggleFollow: (followed: boolean, id: number) => void,
  isAuth: boolean
}

const User: React.FC<PropsType> = ({ user, followingInProgress, toggleFollow, isAuth, ...props }) => {
  const followHandler = () => {
    toggleFollow(user.followed, user.id);
  }

  return (<div key={user.id} className="users__item user">
    <Space className="">
      <NavLink className="" to={`${RouteNames.PROFILE}/${user.id}`}>
        <Avatar src={user.photos.small !== null ? user.photos.small : userPhoto} alt={user.name + "'s avatar"} size={60} />
      </NavLink>
      {isAuth && <Button disabled={followingInProgress.some(id => id === user.id)} className="" onClick={followHandler}>{user.followed ? 'Unfollow' : 'Follow'}</Button>}
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
