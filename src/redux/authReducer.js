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

export const getAuthUserData = () => async (dispatch) => {
  const data = await authAPI.getAuthData();
  if (data.resultCode === 0) {
    const { id, email, login } = data.data;
    // dispatch(setAuthUserData(id, email, login, true));
    if (login) {
      const profileData = await profileAPI.getProfile(id);
      dispatch(setAuthUserData(id, email, login, true, profileData.fullName, profileData.photos.small));

    }
  }
};


export const login = (email, password, rememberMe) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe);
  if (data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else if (data.resultCode === 1) {
    const errorMessage = data.messages.length > 0 ? data.messages[0] : "E-mail or password is wrong";
    dispatch(stopSubmit('login', {
      _error: errorMessage
    }));
  }
};


export const logout = () => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, null, null, false));
  }
};

export default authReducer;
