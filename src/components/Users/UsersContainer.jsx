import Users from './Users';
import {connect} from 'react-redux';
import { setUsersActionCreator, toggleFollowActionCreator } from '../../redux/usersReducer';

const mapStateToProps = (state) => {
  return {
    usersData: state.usersPage.usersData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleFollow: (userId) => {
      dispatch(toggleFollowActionCreator(userId))
    },
    setUsers: (users) => {
      dispatch(setUsersActionCreator(users));
    }
  }
}

const UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;
