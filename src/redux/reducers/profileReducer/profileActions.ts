import { PhotosType, ProfileType } from '../../../types/types';

export enum profileActions {
  ADD_POST = 'profilePage/ADD_POST',
  GET_USER_PROFILE = 'profilePage/GET_USER_PROFILE',
  SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE',
  SET_PROFILE_STATUS = 'profilePage/SET_PROFILE_STATUS',
  DELETE_POST = 'profilePage/DELETE_POST',
  SAVE_PHOTO_SUCCESS = 'profilePage/SAVE_PHOTO_SUCCESS',
  SAVE_PROFILE_SUCCESS = 'profilePage/SAVE_PROFILE_SUCCESS',
  ADD_LIKE = 'profilePage/ADD_LIKE',
  REMOVE_LIKE = 'profilePage/REMOVE_LIKE'
}

export const profileActionCreators = {
  getUserProfile: () => {
    return {
      type: profileActions.GET_USER_PROFILE,
    } as const;
  },
  addPost: (text: string, avatar: string | null, userName: string, userId: number) => {
    return {
      type: profileActions.ADD_POST,
      payload: { text, avatar, userName, userId }
    } as const;
  },
  addLike: (id: number) => {
    return {
      type: profileActions.ADD_LIKE,
      payload: id
    } as const;
  },
  removeLike: (id: number) => {
    return {
      type: profileActions.REMOVE_LIKE,
      payload: id
    } as const;
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: profileActions.SET_USER_PROFILE,
      profile,
    } as const;
  },
  setProfileStatus: (status: string) => {
    return {
      type: profileActions.SET_PROFILE_STATUS,
      status
    } as const;
  },
  deletePost: (postId: number) => {
    return {
      type: profileActions.DELETE_POST,
      postId
    } as const;
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return {
      type: profileActions.SAVE_PHOTO_SUCCESS,
      photos
    } as const;
  },
  saveProfileSuccess: (profileUpdateStatus: string) => {
    return {
      type: profileActions.SAVE_PROFILE_SUCCESS,
      profileUpdateStatus
    } as const;
  }
};
