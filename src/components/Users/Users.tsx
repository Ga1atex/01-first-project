import React from 'react';
import { FilterType } from '../../redux/usersReducer';
import { UserType } from '../../types/types';
import Pagination from '../common/Pagination/Pagination';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';

type PropsType = {
  totalUsersCount: number
  pageSize: number
  portionSize?: number
  currentPage: number
  usersData: Array<UserType>
  followingInProgress: Array<number>
  onPageChanged: (pageNumber: number) => void
  toggleFollow: (followed: boolean, id: number) => any
  onFilterChanged: (filter: FilterType) => void
}

const Users: React.FC<PropsType> = (props) => {
  return (
    <>
      <UsersSearchForm onFilterChanged={props.onFilterChanged}/>
      <Pagination totalItemsCount={props.totalUsersCount} pageSize={props.pageSize} currentPage={props.currentPage} onPageChanged={props.onPageChanged} />
      <div className="page__users users">
        {
          props.usersData.map(user => {
            return <User key={user.id} user={user} followingInProgress={props.followingInProgress} toggleFollow={props.toggleFollow} />;
          })
        }
      </div>
    </>
  );
};

export default Users;
