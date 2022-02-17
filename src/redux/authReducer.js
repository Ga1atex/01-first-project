import { stopSubmit } from 'redux-form';
import { authAPI, profileAPI, securityAPI } from '../api/api';

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  userId: null,
  email: null,
  login: null,
  fullName: null,
  photosSmall: null,
  isAuth: false,
  captchaUrl: null // if null, then captcha is not required
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
    case GET_CAPTCHA_URL_SUCCESS: {
      const newState = {
        ...state,
        captchaUrl: action.captchaUrl
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
export const getCaptchaUrlSuccess = (captchaUrl) => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
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


export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    // success, get auth data
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const errorMessage = data.messages.length > 0 ? data.messages[0] : 'E-mail or password is wrong';
    dispatch(stopSubmit('login', {
      _error: errorMessage
    }));
  }
};

export const getCaptchaUrl = () => async (dispatch) => {
  const data = await securityAPI.getCaptcha();
  const captchaUrl = data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl))
};


export const logout = () => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, null, null, false));
  }
};

export default authReducer;
