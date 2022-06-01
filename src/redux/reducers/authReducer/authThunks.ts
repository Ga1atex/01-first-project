import { ResultCodeForCaptcha, ResultCodesEnum } from '../../../api/api';
import { authAPI } from "../../../api/authAPI";
import { profileAPI } from "../../../api/profileAPI";
import { securityAPI } from "../../../api/securityAPI";
import { BaseThunkType } from '../../store';
import { authActionCreators } from './authActions';
import { ActionsTypes } from './authReducer';

type ThunkType = BaseThunkType<ActionsTypes>;

export const getAuthUserData = (): ThunkType => async (dispatch, getState) => {
  const data = await authAPI.getAuthData();
  if (data.resultCode === ResultCodesEnum.Success) {
    const { id, email, login } = data.data;

    if (login) {
      try {
        const profileData = await profileAPI.getProfile(id);
        dispatch(authActionCreators.setAuthUserData(id, email, login, true, profileData.fullName, profileData.photos.small));
      } catch (error) {
        dispatch(authActionCreators.setAuthUserData(id, email, login, true, null, null));
      }
    }
  }
};


export const login = (email: string, password: string, rememberMe: boolean, captcha: null | string, setErrors: Function): ThunkType => async (dispatch, getState) => {
  const data = await authAPI.login(email, password, rememberMe, captcha);
  if (data.resultCode === ResultCodesEnum.Success) {
    // success, get auth data
    dispatch(getAuthUserData());
  } else {
    if (data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
      dispatch(getCaptchaUrl());
    }
    const errorMessage = data.messages.length > 0 ? data.messages[0] : 'E-mail or password is wrong';
    // dispatch(stopSubmit('login', {
    //   _error: errorMessage
    // }));
    setErrors(errorMessage);
  }
};

export const getCaptchaUrl = (): ThunkType => async (dispatch, getState) => {
  const data = await securityAPI.getCaptcha();
  const captchaUrl = data.url;

  dispatch(authActionCreators.getCaptchaUrlSuccess(captchaUrl));
};


export const logout = (): ThunkType => async (dispatch) => {
  const data = await authAPI.logout();
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(authActionCreators.setAuthUserData(null, null, null, false, null, null));
  }
};
