import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../components/common/Pagination/Pagination';
import { requestUsers } from '../../redux/reducers/usersReducer/usersThunks';
import {
  selectCurrentPage,
  selectFollowingInProgress,
  selectIsFetching,
  selectPageSize,
  selectTotalUsersCount,
  selectUsers,
  selectUsersFilter,
} from '../../redux/reducers/usersReducer/usersSelectors';
import { Users } from './Users';
import { UsersSearchForm } from './UsersSearchForm';
import QueryString from 'qs';
import { RouteNames } from '../../components/AppRoutes';
import { selectIsAuth } from '../../redux/reducers/authReducer/authSelectors';
import { FilterType } from '../../types/types';
import { useAppDispatch } from '../../utils/hooks/reduxHooks';

export type QueryParamsType = {
  term?: string;
  page?: string;
  friend?: string;
};

const UsersContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const pageSize = useSelector(selectPageSize);
  const filter = useSelector(selectUsersFilter);
  const currentPage = useSelector(selectCurrentPage);
  const totalUsersCount = useSelector(selectTotalUsersCount);

  const isFetching = useSelector(selectIsFetching);
  const usersData = useSelector(selectUsers);
  const followingInProgress = useSelector(selectFollowingInProgress);
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();

  const onFilterChanged = useCallback(
    (filter: FilterType) => {
      dispatch(requestUsers({ pageNumber: 1, pageSize, filter }));
    },
    [pageSize, dispatch]
  );

  const onPageChanged = useCallback(
    (pageNumber: number) => {
      dispatch(requestUsers({ pageNumber, pageSize, filter }));
    },
    [pageSize, filter, dispatch]
  );

  useEffect(() => {
    // if (usersData.length) {
    //   return
    // }

    // const urlParams = new URLSearchParams(window.location.search);
    const urlParams = QueryString.parse(
      window.location.search.slice(1)
    ) as QueryParamsType;

    let actualPage = currentPage;
    let actualFilter = filter;

    if (!!urlParams.page) actualPage = Number(urlParams.page);
    if (!!urlParams.term)
      actualFilter = { ...actualFilter, term: urlParams.term };
    if (!!urlParams.friend)
      actualFilter = {
        ...actualFilter,
        friend:
          urlParams.friend === 'null' ? null : urlParams.friend === 'true',
      };

    dispatch(
      requestUsers({ pageNumber: actualPage, pageSize, filter: actualFilter })
    );
  }, []);

  useEffect(() => {
    const queryParams: QueryParamsType = {};

    if (!!filter.term) queryParams.term = filter.term;
    if (filter.friend !== null) queryParams.friend = String(filter.friend);
    if (currentPage !== 1) queryParams.page = String(currentPage);

    navigate({
      pathname: RouteNames.USERS,
      search: QueryString.stringify(queryParams),
    });
  }, [filter, currentPage, navigate]);

  return (
    <>
      <h2>All users</h2>
      <UsersSearchForm onFilterChanged={onFilterChanged} isAuth={isAuth} />
      <Pagination
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        isFetching={isFetching}
      />
      <Users
        isFetching={isFetching}
        usersData={usersData}
        followingInProgress={followingInProgress}
        isAuth={isAuth}
      />
    </>
  );
};

export default UsersContainer;
