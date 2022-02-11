import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, toggleFollowingProgress, requestUsers, toggleFollow } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { compose } from 'redux';
import { getCurrentPage, getFollowingInProgress, getIsFetching, getPageSize, getTotalUsersCount, getUsers } from '../../redux/usersSelectors';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.requestUsers(this.props.currentPage, this.props.pageSize);
  };

  onPageChanged = (pageNumber) => {
    // this.props.setCurrentPage(pageNumber);
    this.props.requestUsers(pageNumber, this.props.pageSize);

    // this.props.toggleIsFetching(true);
    // usersAPI.requestUsers(pageNumber, this.props.pageSize)
    //   .then(data => {
    //       this.props.toggleIsFetching(false);
    //       this.props.setUsers(data.items);
    //   });
  };

  render() {
    return (<>
      {this.props.isFetching ? <Preloader /> : undefined}
      <Users
        totalUsersCount={this.props.totalUsersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        // toggleFollowSuccess={this.props.toggleFollowSuccess}
        onPageChanged={this.onPageChanged}
        usersData={this.props.usersData}
        // toggleFollowingProgress={this.props.toggleFollowingProgress}
        followingInProgress={this.props.followingInProgress}
        toggleFollow={this.props.toggleFollow}
      />
    </>);
  }
}

// const mapStateToProps = (state) => {
//   return {
//     usersData: state.usersPage.usersData,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.followingInProgress,
//   };
// };

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
