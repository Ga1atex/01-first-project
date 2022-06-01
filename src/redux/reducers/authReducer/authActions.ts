export enum authActions {
  SET_USER_DATA = 'auth/SET_USER_DATA',
  GET_CAPTCHA_URL_SUCCESS = 'auth/GET_CAPTCHA_URL_SUCCESS'
}

export const authActionCreators = {
  setAuthUserData: (userId: null | number, email: null | string, login: null | string, isAuth: boolean, fullName: null | string, photoSmall: null | string) => {
    return {
      type: authActions.SET_USER_DATA,
      payload: {
        userId,
        email,
        login,
        isAuth,
        fullName,
        photoSmall,
      }
    } as const;
  },
  getCaptchaUrlSuccess: (captchaUrl: string) => {
    return {
      type: authActions.GET_CAPTCHA_URL_SUCCESS,
      captchaUrl
    } as const;
  }
};
