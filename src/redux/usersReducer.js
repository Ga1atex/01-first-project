import { usersAPI } from "../api/api";

const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'TOGGLE_IS_FOLLOWING_PROGRESS';


const initialState = {
  usersData: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: []
};

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case TOGGLE_FOLLOW: {
      const newState = {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed };
          }
          return user;
        })
      };
      return newState;
    }
    case SET_CURRENT_PAGE: {
      const newState = {
        ...state,
        currentPage: action.currentPage
      };
      return newState;
    }
    case SET_TOTAL_USERS_COUNT: {
      const newState = {
        ...state,
        totalUsersCount: action.count
      };
      return newState;
    }
    case TOGGLE_IS_FETCHING: {
      const newState = {
        ...state,
        isFetching: action.isFetching
      };
      return newState;
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      const newState = {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      };
      return newState;
    }
    case SET_USERS: {
      const newState = {
        ...state,
        usersData: [...action.usersData]
      };
      return newState;
    }
    default:
      return state;
  }
};
// Action Creators
export const setUsers = (usersData) => {
  return {
    type: SET_USERS,
    usersData
  };
};


export const toggleFollowSuccess = (userId) => {
  return {
    type: TOGGLE_FOLLOW,
    userId,
  };
};

export const setCurrentPage = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  };
};

export const setTotalUsersCount = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
  };
};

export const toggleIsFetching = (isFetching) => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching
  };
};

export const toggleFollowingProgress = (isFetching, userId) => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
  };
};

export const getUsers = (pageNumber, pageSize) => {
  return dispatch => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(pageNumber));

    usersAPI.getUsers(pageNumber, pageSize)
      .then(data => {
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount)); // should be replaced somewhere
      });
  };
};

export const toggleFollow = (followed, id) => {
  return (dispatch) => {
    dispatch(toggleFollowingProgress(true, id));
    (followed ?
        usersAPI.unfollow(id)
        : usersAPI.follow(id))
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(toggleFollowSuccess(id));
        }
        dispatch(toggleFollowingProgress(false, id));
      });
  };
};

// export const getProfileStatus = (userId) => {
//   return dispatch => {
//     // dispatch(toggleIsFetching(true));

//     usersAPI.getProfileStatus(userId)
//       .then(data => {
//         // dispatch(toggleIsFetching(false));
//         dispatch(getUserProfle(data));
//       });
//   };
// };

export default usersReducer;
