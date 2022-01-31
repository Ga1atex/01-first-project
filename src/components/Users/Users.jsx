import React from 'react'
import styles from './Users.module.css';

const Users = (props) => {
  if (props.usersData.length === 0) {
    props.setUsers([{ id: 1, fullName: 'Dmitry K', photoUrl: '', status: 'Feelin\' good', countryName: "Russia", cityName: "Moscow", followed: false },
    { id: 2, fullName: 'Evgeniy K', photoUrl: '', status: 'Feelin\' good', countryName: "Ukraine", cityName: "Kiev", followed: true },
    { id: 3, fullName: 'Sergey Y', photoUrl: '', status: 'Feelin\' good', countryName: "Belarus", cityName: "Minks", followed: false },])
  }
  return (
    <div className="page__users users">
      {
        props.usersData.map(user => {
          return <div key={user.id} className="users__item user">
            <div className="">
              <div className=""><img src={user.photoUrl} alt={user.fullName + " avatar image"} width={60} height={60}/></div>
              <button className="" onClick={() => { props.toggleFollow(user.id)}}>{user.followed ? 'Unfollow' : 'Follow'}</button>
            </div>
            <div className="user__info">
              <div className="user__description">
                <div className="user__name">{user.fullName}</div>
                <div className="user__status">{user.status}</div>
              </div>
              <div className="user__location">
                <div className="user__country">{user.countryName}</div>
                <div className="user__city">{user.cityName}</div>
              </div>
            </div>
          </div>;
        })
      }
    </div>
  );
}
export default Users;
