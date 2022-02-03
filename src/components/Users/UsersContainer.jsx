import React from 'react';
import {connect} from 'react-redux';
import { setCurrentPage, setTotalUsersCount, setUsers, toggleFollow, toggleIsFetching } from '../../redux/usersReducer';
import Users from './Users';
import Preloader from '../common/Preloader/Preloader';
import { usersAPI } from '../../api/api';



class UsersContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount = () => {
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(this.props.pageNumber, this.props.pageSize)
      .then(data => {
          this.props.toggleIsFetching(false);
          this.props.setUsers(data.items);
          this.props.setTotalUsersCount(data.totalCount);
      });
  };

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.toggleIsFetching(true);
    usersAPI.getUsers(pageNumber, this.props.pageSize)
      .then(data => {
          this.props.toggleIsFetching(false);
          this.props.setUsers(data.items);
      });
  };

  render() {
    return (<>
    {this.props.isFetching ? <Preloader /> : undefined}
    <Users
      totalUsersCount={this.props.totalUsersCount}
      pageSize={this.props.pageSize}
      currentPage={this.props.currentPage}
      toggleFollow={this.props.toggleFollow}
      onPageChanged={this.onPageChanged}
      usersData={this.props.usersData}
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
    isFetching: state.usersPage.isFetching
  }
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



export default connect(mapStateToProps, {
  toggleFollow,
  setUsers,
  setCurrentPage,
  setTotalUsersCount,
  toggleIsFetching,
})(UsersContainer);
