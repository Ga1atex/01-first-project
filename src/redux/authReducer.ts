import { FormAction, stopSubmit, StopSubmitAction } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { ResultCodeForCaptcha, ResultCodesEnum } from '../api/api';
import { securityAPI } from "../api/securityAPI";
import { authAPI } from "../api/authAPI";
import { profileAPI } from "../api/profileAPI";
import { AppStateType, BaseThunkType, InferActionTypes } from './redux-store';
import { Action } from 'redux';

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

type ActionsTypes = InferActionTypes<typeof actionCreators>

// Action Creators
export const actionCreators = {
  setAuthUserData: (userId: null | number, email: null | string, login: null | string, isAuth: boolean, fullName: null | string, photoSmall: null | string) => {
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
    } as const
  },
  getCaptchaUrlSuccess: (captchaUrl: string) => {
    return {
      type: GET_CAPTCHA_URL_SUCCESS,
      captchaUrl
    } as const
  }
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>

export const getAuthUserData = (): ThunkType => async (dispatch, getState) => {
  const data = await authAPI.getAuthData();
  if (data.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = data.data;
    // dispatch(setAuthUserData(id, email, login, true));
    if (login) {
      const profileData = await profileAPI.getProfile(id);
      dispatch(actionCreators.setAuthUserData(id, email, login, true, profileData.fullName, profileData.photos.small));
    }
  }
};


export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string): ThunkType => async (dispatch, getState) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    // success, get auth data
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const errorMessage = data.messages.length > 0 ? data.messages[0] : 'E-mail or password is wrong';
    dispatch(stopSubmit('login', {
      _error: errorMessage
    }));
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch, getState) => {
  const data = await securityAPI.getCaptcha();
  const captchaUrl = data.url;

  dispatch(actionCreators.getCaptchaUrlSuccess(captchaUrl))
};


export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.setAuthUserData(null, null, null, false, null, null));
  }
};

export default authReducer;
