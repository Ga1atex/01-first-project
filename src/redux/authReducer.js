import { stopSubmit } from "redux-form";
import { authAPI, profileAPI } from "../api/api";

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
  userId: null,
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
export const setAuthUserData = (userId, email, login, isAuth, fullName, photoSmall) => {
  return {
    type: SET_USER_DATA,
    payload: {
      userId,
      email,
      login,
      isAuth,
      fullName,
      photoSmall,
    }
  };
};
export const getAuthUserData = () => (dispatch) => {
  return authAPI.getAuthData()
    .then(data => {
      if (data.resultCode === 0) {
        const { id, email, login } = data.data;
        // dispatch(setAuthUserData(id, email, login, true));
        if (login) {
          return profileAPI.getProfile(id)
            .then(profileData => {
              dispatch(setAuthUserData(id, email, login, true, profileData.fullName, profileData.photos.small));
            });
        }
      }
    }
    );
};


export const login = (email, password, rememberMe) => {
  return (dispatch) => {
    authAPI.login(email, password, rememberMe)
      .then(data => {
        if (data.resultCode === 0) {
          dispatch(getAuthUserData());
        } else if (data.resultCode === 1) {
          const errorMessage = data.messages.length > 0 ? data.messages[0] : "E-mail or password is wrong";
          dispatch(stopSubmit('login', {
            _error: errorMessage
          }));
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
