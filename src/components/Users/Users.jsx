import React from 'react'
import styles from './Users.module.css';
import userPhoto from '../../assets/images/user.png'

const Users = (props) => {
  const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
  const pages = [];
  for (let i = 1; i <= pagesCount; i++) {
    if (pages.length < 10) {
      pages.push(i);
    }
  }
  console.log(props);
  return (
    <div className="page__users users">
      <div className="pagging">
        {/* <a href="" className="pagging__arrow"></a> */}
        <ul className="pagging__list">
          {pages.map(p => {
            return <li className="pagging__item" key={p}><a href="#" className={props.currentPage === p ? styles.active : undefined + "pagging__item"} onClick={(e) => { props.onPageChanged(p); }}>{p}</a></li>;
          })}
        </ul>
        {/* <a href="" className="pagging__arrow"></a>  */}
      </div>
      {
        props.usersData.map(user => {
          return <div key={user.id} className="users__item user">
            <div className="">
              <div className=""><img src={user.photos.small != null ? user.photos.small : userPhoto} alt={user.name + " avatar image"} width={60} height={60} /></div>
              <button className="" onClick={() => { props.toggleFollow(user.id); }}>{user.followed ? 'Unfollow' : 'Follow'}</button>
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
          </div>;
        })
      }
    </div>
  );
}

export default Users;
