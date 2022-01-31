const TOGGLE_FOLLOW = 'TOGGLE_FOLLOW';
const SET_USERS = 'SET_USERS';


const initialState = {
  usersData: [],
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
  console.log(usersData);

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

export default usersReducer;
