import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { AppStateType } from '../../redux/redux-store';
import { FilterType, requestUsers, toggleFollow } from '../../redux/usersReducer';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers, getUsersFilter } from '../../redux/usersSelectors';
import { UserType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import Users from './Users';

type MapStatePropsType = {
  currentPage: number
  pageSize: number
  isFetching: boolean
  usersData: Array<UserType>
  totalUsersCount: number
  followingInProgress: Array<number>
  filter: FilterType
}

type MapDispatchPropsType = {
  requestUsers: (pageNumber:number, pageSize:number, filter: FilterType) => void
  toggleFollow: (followed: boolean, id: number) => any
}

type OwnPropsType = {
  pageTitle: string
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType


const UsersContainer: React.FC<PropsType> = (props) => {
  useEffect(() => {
    props.requestUsers(props.currentPage, props.pageSize, props.filter);
  }, [])

  const onPageChanged = (pageNumber: number) => {
    // props.setCurrentPage(pageNumber);
    props.requestUsers(pageNumber, props.pageSize, props.filter);
    // props.toggleIsFetching(true);
    // usersAPI.requestUsers(pageNumber, props.pageSize)
    //   .then(data => {
    //       props.toggleIsFetching(false);
    //       props.setUsers(data.items);
    //   });
  };

  const onFilterChanged = (filter: FilterType) => {
    props.requestUsers(1, props.pageSize, filter);
  }
    return (<>
    <h2>{props.pageTitle}</h2>
      {props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        onPageChanged={onPageChanged}
        usersData={props.usersData}
        followingInProgress={props.followingInProgress}
        toggleFollow={props.toggleFollow}
        onFilterChanged={onFilterChanged}

      />
    </>);

}

// const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleFollow: (userId) => {
//       dispatch(toggleFollowActionCreator(userId))
//     },
//     setUsers: (users) => {
//       dispatch(setUsersActionCreator(users));
//     },
//     setCurrentPage: (pageNumber) => {
//       dispatch(setCurrentPageActionCreator(pageNumber));
//     },
//     setTotalUsersCount: (totalCount) => {
//       dispatch(setTotalUsersCountActionCreator(totalCount));
//     },
//     toggleIsFetching: (IsFetching) => {
//       dispatch(toggleIsFetchingActionCreator(IsFetching));
//     },
//   }
// }

const mapStateToProps = (state: AppStateType):MapStatePropsType => {
  return {
    usersData: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
    filter: getUsersFilter(state)
  };
};


export default compose(
  // TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
    toggleFollow,
    requestUsers,
  }),
)(UsersContainer);
