import axios from "axios";
import { UserType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  headers: {
    "API-KEY": "e017ae69-e966-4945-ad4f-10686b5f9804"
  }
});

export enum ResultCodesEnum {
  Success = 0,
  Error = 1
}
export enum ResultCodeForCaptcha {
  CaptchaIsRequired = 10
}

export type GetItemsType = {
  items: Array<UserType>
  totalCount: number
  error: string | null
}

// export function sendResponseData<T>(response: AxiosResponse):T {
  // return response.data;
  // if (response.status === 200) {
  //   return response.data;
  // } else {
  //   return {error: `${response.status} error`}
  // }
// };


export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D,
  messages: Array<string>
  resultCode: RC
}
