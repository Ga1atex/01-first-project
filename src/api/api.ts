import axios from 'axios';
import { history } from '../App';
import { UserType } from '../types/types';
import { RouteNames } from '../components/AppRoutes';
// const API_KEY = process.env.REACT_APP_API_KEY
const API_KEY = 'c80f3803-fc2f-4a2e-bfe2-8b3c68d180cf';

export const instance = axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    'API-KEY': API_KEY,
  },
});

const apiKeyStorageKey = 'API-KEY';
export const setSecureConnection = (apiKey?: string) => {
  localStorage.setItem(apiKeyStorageKey, apiKey ?? API_KEY);
  instance.defaults.headers['API-KEY'] = apiKey ?? API_KEY;
};

export const getSecureConnection = () => {
  const apiKey = localStorage.getItem(apiKeyStorageKey);
  instance.defaults.headers['API-KEY'] = apiKey ?? API_KEY;
};
getSecureConnection();

export const clearSecureConnection = () => {
  localStorage.removeItem(apiKeyStorageKey);
  instance.defaults.headers['API-KEY'] = API_KEY;
};

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // client received an error response (5xx, 4xx)
      const status = error.response.status;
      if (status === 401) {
        history.replace(RouteNames.LOGIN);
      }
      if (status === 403) {
        history.replace(RouteNames.NO_ACCESS);
      }
      if (status === 500) {
        history.replace(RouteNames.SERVER_ERROR);
      }
    } else if (error.request) {
      // client never received a response, or request never left
    } else {
      // anything else
    }
    return Promise.reject(error);
  }
);

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10,
}

export type GetItemsType = {
  items: Array<UserType>;
  totalCount: number;
  error: string | null;
};

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D;
  messages: Array<string>;
  resultCode: RC;
};
