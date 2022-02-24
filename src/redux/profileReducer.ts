import { FormAction, FormErrors, stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { ResultCodesEnum } from '../api/api';
import { profileAPI } from "../api/profileAPI";
import { PhotosType, PostType, ProfileType } from '../types/types';
import { AppStateType, BaseThunkType, InferActionTypes } from './redux-store';

const ADD_POST = 'social-network/profilePage/ADD_POST';
const SET_USER_PROFILE = 'social-network/profilePage/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'social-network/profilePage/SET_PROFILE_STATUS';
const DELETE_POST = 'social-network/profilePage/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'social-network/profilePage/SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE_SUCCESS = 'social-network/profilePage/SAVE_PROFILE_SUCCESS';



const initialState = {
  postsData: [
    { id: 1, message: 'Post1', likesCount: 431 },
    { id: 2, message: 'Hey', likesCount: 431 },
    { id: 3, message: 'Hi', likesCount: 431 },
    { id: 4, message: 'How is your day123', likesCount: 222 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  profileUpdateStatus: 'none',
  status: ''
};

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actionCreators>

const profileReducer = (state = initialState, action: ActionsTypes):InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newState = {
        ...state,
        postsData: [...state.postsData]
      };

      const newPost = {
        id: state.postsData.length + 1,
        message: action.text,
        likesCount: 0
      };
      newState.postsData.push(newPost);

      return newState;
    }
    case SET_USER_PROFILE: {
      const newState = {
        ...state,
        profile: action.profile
      };
      return newState;
    }
    case SET_PROFILE_STATUS: {
      const newState = {
        ...state,
        status: action.status
      };
      return newState;
    }
    case DELETE_POST: {
      const newState = {
        ...state,
        postsData: state.postsData.filter(user => user.id !== action.postId)
      };
      return newState;
    }
    case SAVE_PHOTO_SUCCESS: {
      const newState = {
        ...state,
        profile: {...state.profile, photos: action.photos} as ProfileType
      };
      return newState;
    }
    case SAVE_PROFILE_SUCCESS: {

      const newState = {
        ...state,
        profileUpdateStatus: action.profileUpdateStatus
      };
      return newState;
    }

    default:
      return state;
  }
};

//Action creators
export const actionCreators = {
  addPost: (text: string) => {
    return {
      type: ADD_POST,
      text
    } as const
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: SET_USER_PROFILE,
      profile
    } as const
  },
  setProfileStatus: (status: string) => {
    return {
      type: SET_PROFILE_STATUS,
      status
    } as const
  },
  deletePost: (postId: number) => {
    return {
      type: DELETE_POST,
      postId
    } as const
  },
  savePhotoSuccess: (photos: PhotosType) => {
    return {
      type: SAVE_PHOTO_SUCCESS,
      photos
    } as const
  },
  saveProfileSuccess: (profileUpdateStatus: string) => {
    return {
      type: SAVE_PROFILE_SUCCESS,
      profileUpdateStatus
    } as const
  }
}

type ThunkType = BaseThunkType<ActionsTypes | FormAction>
//Thunk Creators
export const getUserProfile = (userId: null | number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(actionCreators.setUserProfile(data));
};
export const getProfileStatus = (userId: number):ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfileStatus(userId);

  dispatch(actionCreators.setProfileStatus(data));
};
export const updateProfileStatus = (status: string):ThunkType => async (dispatch) => {
  const data = await profileAPI.updateProfileStatus(status);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.setProfileStatus(status));
  }
};
export const savePhoto = (file: File):ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.savePhotoSuccess(data.data.photos));
  } else if (data.resultCode === ResultCodesEnum.Error) {
    const errorMessage = data.messages.length ? data.messages[0] : 'Image download fail';
    alert(errorMessage)
  }
};
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.saveProfileSuccess('success'))
    dispatch(getUserProfile(getState().auth.userId))
  } else if (data.resultCode === ResultCodesEnum.Error) {
    // const errorMessages = data.messages.length ? data.messages[0] : 'Wrong link';

    const errorMessages: FormErrors = data.messages.reduce((obj: { [key: string]: any}, item: string) => {
      const errorInputs = item.match(/(.*)\((\w+)->(\w+)\)/i);
      if (errorInputs && errorInputs.length) {
        const [errorMessage, errorGroup, errorInput] = [errorInputs[1].trim(), errorInputs[2].toLowerCase(), errorInputs[3].toLowerCase()];

        if (obj[errorGroup]) {
          obj[errorGroup][errorInput] = errorMessage
        } else {
          obj[errorGroup] = {
            [errorInput]: errorMessage
          }
        }
      }

      return obj;
    }, {})
    dispatch(actionCreators.saveProfileSuccess('error'))
    dispatch(stopSubmit('edit-profile', errorMessages));

    // return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
