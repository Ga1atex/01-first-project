const SET_USER_DATA = 'SET_USER_DATA';



const initialState = {
  id: null,
  email: null,
  login: null,
  isAuth: false,
  isFetching: false,
  fullName: null,
  photosSmall: null
};

const authReducer = (state = initialState, action) => {

  switch (action.type) {
    case SET_USER_DATA: {
      const newState = {
        ...state,
        ...action,
        isAuth: true
      };
      return newState;
    }
    default:
      return state;
  }
};
// Action Creators
export const setAuthUserData = (userId, email, login, fullName, photoSmall, isAuth, isFetching) => {
  return {
    type: SET_USER_DATA,
    userId,
    email,
    login,
    fullName,
    photoSmall,
    // isAuth,
    // isFetching
  };
};


export default authReducer;
