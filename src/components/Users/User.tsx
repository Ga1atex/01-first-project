import React from 'react';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import userPhoto from '../../assets/images/user.png';
import { UserType } from '../../types/types';

type PropsType = {
  user: UserType
  followingInProgress: Array<number>
  toggleFollow: (followed: boolean, id: number) => void
}

const User: React.FC<PropsType> = ({ user, followingInProgress, toggleFollow,  ...props}) => {
  return (<div key={user.id} className="users__item user">
    <div className="">
      <NavLink className="" to={"/profile/" + user.id}>
        <img src={user.photos.small != null ? user.photos.small : userPhoto} alt={user.name + " avatar image"} width={60} height={60} />
      </NavLink>
      <button disabled={followingInProgress.some(id => id === user.id)} className="" onClick={() => {
        toggleFollow(user.followed, user.id);
      }}>{user.followed ? 'Unfollow' : 'Follow'}</button>
    </div>
    <div className="user__info">
      <div className="user__description">
        <div className="user__name">{user.name}</div>
        <div className="user__status">{user.status}</div>
      </div>
      {/* <div className="user__location">
                <div className="user__country">{user.countryName}</div>
                <div className="user__city">{user.cityName}</div>
              </div> */}
    </div>
  </div>
  );
};

export default User;
