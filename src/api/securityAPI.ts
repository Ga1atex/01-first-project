import { instance } from './api';

export type GetCaptchaType = {
  url: string;
};

export const securityAPI = {
  async getCaptcha() {
    const response = await instance.get<GetCaptchaType>(
      `security/get-captcha-url`
    );
    return response.data;
  },
};
