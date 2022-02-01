const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'SET_TOTAL_USERS_COUNT';


const initialState = {
  usersData: [],
  pageSize: 5,
  totalUsersCount: 0,
  currentPage: 1
}

const usersReducer = (state = initialState, action) => {

  switch (action.type) {
    case TOGGLE_FOLLOW: {
      const newState = {
        ...state,
        usersData: state.usersData.map((user) => {
          if (user.id === action.userId) {
            return {...user, followed: !user.followed}
          }
          return user;
        })
      };
      return newState;
    }
    case SET_CURRENT_PAGE:{
      const newState = {
        ...state,
        currentPage: action.currentPage
      }
      return newState
    }
     case SET_TOTAL_USERS_COUNT: {
      const newState = {
        ...state,
        totalUsersCount: action.count
      };
      return newState;
    }
    case SET_USERS:{
      const newState = {
        ...state,
        usersData: [...action.usersData]
        // usersData: [...state.usersData, ...action.usersData]
      };
      return newState;
    }
    default:
      return state;
  }
};

export const setUsersActionCreator = (usersData) => {
  return {
    type: SET_USERS,
    usersData
  };
};

export const toggleFollowActionCreator = (userId) => {
  return {
    type: TOGGLE_FOLLOW,
    userId,
  };
};

export const setCurrentPageActionCreator = (currentPage) => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  }
}
export const setTotalUsersCountActionCreator
 = (totalUsersCount) => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
  };
}
export default usersReducer;
