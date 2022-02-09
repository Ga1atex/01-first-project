import React from 'react';
import { connect } from 'react-redux';
import { setCurrentPage, toggleFollowingProgress, getUsers, toggleFollow } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../../hoc/withAuthRedirect';
import { compose } from 'redux';

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  };

  onPageChanged = (pageNumber) => {
    // this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);

    // this.props.toggleIsFetching(true);
    // usersAPI.getUsers(pageNumber, this.props.pageSize)
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

const mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,
    isFetching: state.usersPage.isFetching,
    followingInProgress: state.usersPage.followingInProgress,
  };
};

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


export default compose(
  connect(mapStateToProps, {
    toggleFollow,
    // setUsers,
    setCurrentPage,
    // setTotalUsersCount,
    // toggleIsFetching,
    toggleFollowingProgress,
    getUsers,
    // toggleFollowSuccess
  }),
  withAuthRedirect,
)(UsersContainer);
