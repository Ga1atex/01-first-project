import { GetItemsType, instance, APIResponseType } from "./api";

export const usersAPI = {
  async getUsers(pageNumber = 1, pageSize = 10, term: string = '', friend: null | boolean = null) {
    const response = await instance.get<GetItemsType>(`users?page=${pageNumber}&count=${pageSize}${term? `&term=${term}` : '' }${friend !== null? `&friend=${friend}`: '' }`);
    // return sendResponseData<GetItemsType>(response);
    return response.data
  },
  async follow(id: number) {
    const response = await instance.post<APIResponseType>(`follow/${id}`);
    return response.data;
  },
  async unfollow(id: number) {
    const response = await instance.delete<APIResponseType>(`follow/${id}`) ;
    return response.data;
  },
};
