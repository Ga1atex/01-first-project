import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { profileAPI } from '../api/api';
import { PhotosType, PostType, ProfileType } from '../types/types';
import { AppStateType } from './redux-store';

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

type ActionsTypes = AddPostActionType | SetUserProfileActionType | setProfileStatusActionType |deletePostActionType |savePhotoSuccessActionType |saveProfileSuccessActionType

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
type AddPostActionType = {
  type: typeof ADD_POST,
  text: string
}
export const addPost = (text: string):AddPostActionType => {
  return {
    type: ADD_POST,
    text
  };
};
type SetUserProfileActionType= {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}
//
export const setUserProfile = (profile:ProfileType):SetUserProfileActionType => {
  return {
    type: SET_USER_PROFILE,
    profile
  };
};
type setProfileStatusActionType = {
  type: typeof SET_PROFILE_STATUS,
  status: string
}
export const setProfileStatus = (status: string):setProfileStatusActionType => {
  return {
    type: SET_PROFILE_STATUS,
    status
  };
};
type deletePostActionType = {
  type: typeof DELETE_POST,
  postId: number
}
export const deletePost = (postId: number): deletePostActionType => {
  return {
    type: DELETE_POST,
    postId
  };
};
type savePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS,
  photos: PhotosType
}
export const savePhotoSuccess = (photos:PhotosType):savePhotoSuccessActionType => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos
  };
};
type saveProfileSuccessActionType = {
  type: typeof SAVE_PROFILE_SUCCESS,
  profileUpdateStatus:string
}
export const saveProfileSuccess = (profileUpdateStatus:string):saveProfileSuccessActionType => {
  return {
    type: SAVE_PROFILE_SUCCESS,
    profileUpdateStatus
  };
};

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const getUserProfile = (userId: null | number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};
export const getProfileStatus = (userId: number):ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfileStatus(userId);

  dispatch(setProfileStatus(data));
};
export const updateProfileStatus = (status: string):ThunkType => async (dispatch) => {
  const data = await profileAPI.updateProfileStatus(status);

  if (data.resultCode === 0) {
    dispatch(setProfileStatus(status));
  }
};
export const savePhoto = (file: any):ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  } else if (data.resultCode === 1) {
    const errorMessage = data.messages.length ? data.messages[0] : 'Image download fail';
    alert(errorMessage)
  }
};
export const saveProfile = (profile: ProfileType): ThunkType => async (dispatch, getState) => {
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    dispatch(saveProfileSuccess('success'))
    dispatch(getUserProfile(getState().auth.userId))
  } else if (data.resultCode === 1) {
    // const errorMessages = data.messages.length ? data.messages[0] : 'Wrong link';

    const errorMessages = data.messages.reduce(function (obj: any, item: any) {
      const errorInputs = item.match(/(.*)\((\w+)->(\w+)\)/i);
      const [errorMessage, errorGroup, errorInput] = [errorInputs[1].trim(), errorInputs[2].toLowerCase(), errorInputs[3].toLowerCase()];

      if (obj[errorGroup]) {
        obj[errorGroup][errorInput] = errorMessage
      } else {
        obj[errorGroup] = {
          [errorInput]: errorMessage
        }
      }
      return obj;
    }, {})
    dispatch(saveProfileSuccess('error'))
    // @ts-ignore
    dispatch(stopSubmit('edit-profile', errorMessages));

    // return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
