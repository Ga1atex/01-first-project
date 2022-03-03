import QueryString from 'qs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { parseCommandLine } from 'typescript';
import { FilterType, requestUsers, toggleFollow } from '../../redux/usersReducer';
import { getCurrentPage, getFollowingInProgress, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/usersSelectors';
import Pagination from '../common/Pagination/Pagination';
import User from './User';
import { UsersSearchForm } from './UsersSearchForm';


export const Users: React.FC = () => {

  const totalUsersCount = useSelector(getTotalUsersCount)
  const usersData = useSelector(getUsers)
  const pageSize = useSelector(getPageSize)
  const currentPage = useSelector(getCurrentPage)
  const followingInProgress = useSelector(getFollowingInProgress)

  const filter = useSelector(getUsersFilter)
  const dispatch = useDispatch()
  let navigate = useNavigate();

  type QueryParamsType = {
    term?: string,
    page?: string,
    friend?: string
  }

  useEffect(() => {
    // const urlParams = new URLSearchParams(window.location.search);
    const urlParams = QueryString.parse(window.location.search.slice(1)) as QueryParamsType

    let actualPage = currentPage
    let actualFilter = filter
    if (!!urlParams.page)
      actualPage = Number(urlParams.page)
    if (!!urlParams.term)
      actualFilter = { ...actualFilter, term: urlParams.term }
    if (!!urlParams.friend)
      actualFilter = { ...actualFilter, friend: urlParams.friend === "null" ? null : urlParams.friend === "true" }


    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const queryParams: QueryParamsType = {}

    if (!!filter.term) queryParams.term = filter.term
    if (filter.friend !== null) queryParams.friend = String(filter.friend)
    if (currentPage !== 1) queryParams.page = String(currentPage)

    navigate({
      pathname: '/users',
      search: QueryString.stringify(queryParams)
    })
  }, [filter, currentPage])

  const onPageChanged = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter));
  };

  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter));
  }

  const toggleFollowCB = (followed: boolean, id: number) => {
    dispatch(toggleFollow(followed, id))
  }
  return (
    <>
      <UsersSearchForm onFilterChanged={onFilterChanged} />
      <Pagination totalItemsCount={totalUsersCount} pageSize={pageSize} currentPage={currentPage} onPageChanged={onPageChanged} />
      <div className="page__users users">
        {
          usersData.map(user => {
            return <User key={user.id} user={user} followingInProgress={followingInProgress} toggleFollow={toggleFollowCB} />;
          })
        }
      </div>
    </>
  );
};
