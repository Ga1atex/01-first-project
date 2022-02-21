import { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { authAPI, profileAPI, securityAPI } from '../api/api';
import { GetStateType } from '../types/types';
import { AppStateType } from './redux-store';

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_URL_SUCCESS = 'social-network/auth/GET_CAPTCHA_URL_SUCCESS';

const initialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  fullName: null as null | string,
  photoSmall: null as null | string,
  isAuth: false,
  captchaUrl: null as null | string// if null, then captcha is not required
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
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

type setAuthUserDataActionPayloadType = {
  userId: number | null,
      email: string | null,
      login: string | null,
      isAuth: boolean,
      fullName: string | null,
      photoSmall: string | null
}

type ActionsTypes = setAuthUserDataActionType | getCaptchaUrlSuccessActionType

type setAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: setAuthUserDataActionPayloadType
}
// Action Creators
export const setAuthUserData = (userId: null | number, email: null | string, login: null | string, isAuth: boolean, fullName: null | string, photoSmall: null | string):setAuthUserDataActionType => {
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

type getCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  captchaUrl: string
}
export const getCaptchaUrlSuccess = (captchaUrl: string):getCaptchaUrlSuccessActionType => {
  return {
    type: GET_CAPTCHA_URL_SUCCESS,
    captchaUrl
  };
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getAuthUserData = (): ThunkType => async (dispatch, getState) => {
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


export const login = (email: string, password: string, rememberMe: boolean, captcha: null | undefined): ThunkType => async (dispatch, getState) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === 0) {
    // success, get auth data
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    const errorMessage = data.messages.length > 0 ? data.messages[0] : 'E-mail or password is wrong';
    // @ts-ignore
    dispatch(stopSubmit('login', {
      _error: errorMessage
    }));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch, getState) => {
  const data = await securityAPI.getCaptcha();
  const captchaUrl = data.url;

  dispatch(getCaptchaUrlSuccess(captchaUrl))
};


export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false, null, null));
  }
};

export default authReducer;
