import React from 'react';
import {connect} from 'react-redux';
import { setCurrentPageActionCreator, setTotalUsersCountActionCreator, setUsersActionCreator, toggleFollowActionCreator } from '../../redux/usersReducer';
import axios from 'axios';
import Users from './Users';



class UsersContainer extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount = () => {
    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
      .then(response => {
        if (response.status === 200) {
          this.props.setUsers(response.data.items);
          this.props.setTotalUsersCount(response.data.totalCount);

        }
      });
  };

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);

    axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${pageNumber}&count=${this.props.pageSize}`)
      .then(response => {
        if (response.status === 200) {
          this.props.setUsers(response.data.items);
        }
      });
  };

  render() {
    return <Users
      totalUsersCount={this.props.totalUsersCount}
      pageSize={this.props.pageSize}
      currentPage={this.props.currentPage}
      toggleFollow={this.props.toggleFollow}
      onPageChanged={this.onPageChanged}
      usersData={this.props.usersData}
    />;
  }
}

const mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData,
    pageSize: state.usersPage.pageSize,
    totalUsersCount: state.usersPage.totalUsersCount,
    currentPage: state.usersPage.currentPage,

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFollow: (userId) => {
      dispatch(toggleFollowActionCreator(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersActionCreator(users));
    },
    setCurrentPage: (pageNumber) => {
      dispatch(setCurrentPageActionCreator(pageNumber));
    },
    setTotalUsersCount: (totalCount) => {
      dispatch(setTotalUsersCountActionCreator(totalCount));
    }
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
