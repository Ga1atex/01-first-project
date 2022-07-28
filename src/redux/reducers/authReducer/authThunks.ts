import { createAsyncThunk } from "@reduxjs/toolkit";
import { ResultCodeForCaptcha, ResultCodesEnum } from "../../../api/api";
import { authAPI } from "../../../api/authAPI";
import { profileAPI } from "../../../api/profileAPI";
import { securityAPI } from "../../../api/securityAPI";
// import { BaseThunkType } from '../../store';
// import { authActionCreators } from './authActions';
// import { ActionsTypes } from './authReducer';

// type ThunkType = BaseThunkType<ActionsTypes>;

export const getAuthUserData = createAsyncThunk(
  "auth/getAuthUserData",
  async (_, thunkAPI) => {
    const response = await authAPI.getAuthData();
    if (response.resultCode === ResultCodesEnum.Success) {
      const { id, email, login } = response.data;

      if (login) {
        try {
          const profileData = await profileAPI.getProfile(id);
          return {
            userId: id,
            email,
            login,
            isAuth: true,
            fullName: profileData.fullName,
            photoSmall: profileData.photos.small,
          };
        } catch (error) {
          return thunkAPI.rejectWithValue({
            userId: id,
            email,
            login,
            isAuth: true,
            fullName: null,
            photoSmall: null,
          });
        }
      }
    }
    // return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (
    {
      email,
      password,
      rememberMe,
      captcha,
      setErrors,
    }: {
      email: string;
      password: string;
      rememberMe: boolean;
      captcha: null | string;
      setErrors: Function;
    },
    thunkAPI
  ) => {
    const response = await authAPI.login(email, password, rememberMe, captcha);

    if (response.resultCode === ResultCodesEnum.Success) {
      // success, get auth data
      thunkAPI.dispatch(getAuthUserData());
    } else {
      if (response.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
        thunkAPI.dispatch(getCaptchaUrl());
      }

      const errorMessage =
        response.messages.length > 0
          ? response.messages[0]
          : "E-mail or password is wrong";

      setErrors({ email: errorMessage, password: errorMessage });
    }
  }
);

export const getCaptchaUrl = createAsyncThunk(
  "auth/getCaptchaUrl",
  async (_, thunkAPI) => {
    const response = await securityAPI.getCaptcha();
    const captchaUrl = response.url;

    return captchaUrl;
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  const response = await authAPI.logout();
  if (response.resultCode === ResultCodesEnum.Success) {
    return;
  }
});
