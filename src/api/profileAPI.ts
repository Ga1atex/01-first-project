import { RcFile } from "antd/lib/upload/interface";
import { PhotosType, ProfileType } from "../types/types";
import { APIResponseType, instance } from "./api";

type SavePhotoResponseDataType = {
  photos: PhotosType
}


export const profileAPI = {
  async getProfile(userId: number | null) {
    const response = await instance.get<ProfileType>(`profile/${userId}`);
    return response.data;
  },
  async getProfileStatus(userId: number) {
    const response = await instance.get<string>(`profile/status/${userId}`);
    return response.data;
  },
  async updateProfileStatus(statusText: string) {
    const response = await instance.put<APIResponseType>(`profile/status/`, {
      status: statusText
    });
    return response.data;
  },
  // async savePhoto(photoFile: UploadFile<unknown>) {
  // async savePhoto(photoFile: File) {
  async savePhoto(photoFile: string | Blob | RcFile) {
    const formData = new FormData();
    formData.append('image', photoFile);
    // formData.append('image', photoFile.originFileObj as Blob);
    //   formData.append('image', photoFile);
    const response = await instance.put<APIResponseType<SavePhotoResponseDataType>>(`profile/photo/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
    });
    return response.data;
  },
  async saveProfile(profile: ProfileType) {
    const response = await instance.put<APIResponseType<ProfileType>>(`profile/`, profile);
    return response.data;
  }
};
