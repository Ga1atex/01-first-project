import { instance, APIResponseType, ResultCodeForCaptcha, ResultCodesEnum } from "./api";


export type GetAuthDataType = {
  id: number
  email: string
  login: string
}
export type LoginResponseDataType = {
  id: number
}

export const authAPI = {
  async getAuthData() {
    const response = await instance.get<APIResponseType<GetAuthDataType>>(`auth/me`);
    return response.data;
  },
  async login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    const response = await instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptcha>>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha
    });
    return response.data;
  },
  async logout() {
    const response = await instance.delete<APIResponseType>(`auth/login`);
    return response.data;
  }
};
