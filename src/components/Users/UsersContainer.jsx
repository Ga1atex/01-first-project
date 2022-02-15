import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, toggleFollowingProgress, requestUsers, toggleFollow } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/usersSelectors';

const UsersContainer =(props) => {
  useEffect(() => {
    props.requestUsers(props.currentPage, props.pageSize);
  }, [])

  const onPageChanged = (pageNumber) => {
    // props.setCurrentPage(pageNumber);
    props.requestUsers(pageNumber, props.pageSize);

    // props.toggleIsFetching(true);
    // usersAPI.requestUsers(pageNumber, props.pageSize)
    //   .then(data => {
    //       props.toggleIsFetching(false);
    //       props.setUsers(data.items);
    //   });
  };
    return (<>
      {props.isFetching ? <Preloader /> : null}
      <Users
        totalUsersCount={props.totalUsersCount}
        pageSize={props.pageSize}
        currentPage={props.currentPage}
        // toggleFollowSuccess={props.toggleFollowSuccess}
        onPageChanged={onPageChanged}
        usersData={props.usersData}
        // toggleFollowingProgress={props.toggleFollowingProgress}
        followingInProgress={props.followingInProgress}
        toggleFollow={props.toggleFollow}
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

const mapStateToProps = (state) => {
  return {
    usersData: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getFollowingInProgress(state),
  };
};


export default compose(
  connect(mapStateToProps, {
    toggleFollow,
    setCurrentPage,
    toggleFollowingProgress,
    requestUsers,
  }),
)(UsersContainer);
