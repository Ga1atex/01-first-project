import React from 'react';
import Pagination from '../common/Pagination/Pagination';
import User from './User';

const Users = (props) => {
  return (
    <>
    <Pagination totalUsersCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged}/>
    <div className="page__users users">
      {
        props.usersData.map(user => {
          return <User key={user.id} user={user} followingInProgress={props.followingInProgress} toggleFollow={props.toggleFollow}/>;
        })
      }
    </div>
    </>
  );
};

export default Users;
