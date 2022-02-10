import { authAPI, profileAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  id: null,
  email: null,
  login: null,
  // isFetching: false,
  fullName: null,
  photosSmall: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA: {
      const newState = {
        ...state,
        ...action.payload
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
    payload: {
      userId,
      email,
      login,
      fullName,
      photoSmall,
      isAuth,
    }
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
            profileAPI.getProfile(id)
              .then(data => {
                dispatch(setAuthUserData(id, email, login, data.fullName, data.photos.small, true));
              });
          }
        }
      }
      );
  }
};

export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(getAuthUserData());
        }
      }
      );
  };
};

export const logout = () => {
  return (dispatch) => {
    authAPI.logout()
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(setAuthUserData(null, null, null, null, null, false));
        }
      }
      );
  };
};

export default authReducer;
