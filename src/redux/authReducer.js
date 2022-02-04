import { authAPI, usersAPI } from "../api/api";

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

export const getAuthUserData = () => {
  return (dispatch) => {
    authAPI.getAuthData()
      .then(data => {
        if (data.resultCode === 0) {
          const { id, email, login } = data.data;
          // this.props.setAuthUserData(id, email, login);
          if (login) {
            usersAPI.getProfile(id)
              .then(data => {
                dispatch(setAuthUserData(id, email, login, data.fullName, data.photos.small));
              });
          }
        }
      }
      );
  }

};

export default authReducer;
