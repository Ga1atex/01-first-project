import { message } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { ResultCodesEnum } from '../../../api/api';
import { profileAPI } from "../../../api/profileAPI";
import { PhotosType, PostType, ProfileType } from '../../../types/types';
import { BaseThunkType, InferActionTypes } from '../../store';

const ADD_POST = 'profilePage/ADD_POST';
const GET_USER_PROFILE = 'profilePage/GET_USER_PROFILE';
const SET_USER_PROFILE = 'profilePage/SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'profilePage/SET_PROFILE_STATUS';
const DELETE_POST = 'profilePage/DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'profilePage/SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE_SUCCESS = 'profilePage/SAVE_PROFILE_SUCCESS';
const ADD_LIKE = 'profilePage/ADD_LIKE';
const REMOVE_LIKE = 'profilePage/REMOVE_LIKE';



const initialState = {
  postsData: [
    // { id: 1, message: 'Post1', likesCount: 1, isLiked: false },
    // { id: 2, message: 'Hey', likesCount: 0, isLiked: false },
    // { id: 3, message: 'Hi', likesCount: 20, isLiked: false },
    // { id: 4, message: 'How is your day123', likesCount: 11, isLiked: false },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  profileUpdateStatus: 'none',
  status: '',
  isFetching: false
};

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actionCreators>

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case ADD_POST: {
      const newState = {
        ...state,
        postsData: [...state.postsData]
      };

      const newPost = {
        id: state.postsData.length + 1,
        message: action.text,
        likesCount: 0,
        isLiked: false
      };
      newState.postsData.push(newPost);

      return newState;
    }
    case GET_USER_PROFILE: {
      const newState = {
        ...state,
        isFetching: true
      };
      return newState;
    }
    case SET_USER_PROFILE: {
      const newState = {
        ...state,
        profile: action.profile,
        isFetching: false
      };
      return newState;
    }
    case ADD_LIKE: {
      const newState = {
        ...state,
        postsData: state.postsData.map(item => {
          if (item.id === action.payload) {
            item.likesCount += 1;
            item.isLiked = true;
          }
          return item
        })
      };
      return newState;
    }
    case REMOVE_LIKE: {
      const newState = {
        ...state,
        postsData: state.postsData.map(item => {
          if (item.id === action.payload) {
            item.likesCount -= 1;
            item.isLiked = false;
          }
          return item
        })
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
        profile: { ...state.profile, photos: action.photos } as ProfileType
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
  getUserProfile: () => {
    return {
      type: GET_USER_PROFILE,
    } as const
  },
  addPost: (text: string) => {
    return {
      type: ADD_POST,
      text
    } as const
  },
  addLike: (id: number) => {
    return {
      type: ADD_LIKE,
      payload: id
    } as const
  },
  removeLike: (id: number) => {
    return {
      type: REMOVE_LIKE,
      payload: id
    } as const
  },
  setUserProfile: (profile: ProfileType) => {
    return {
      type: SET_USER_PROFILE,
      profile,
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

type ThunkType = BaseThunkType<ActionsTypes>
//Thunk Creators
export const getUserProfile = (userId: null | number): ThunkType => async (dispatch) => {
  dispatch(actionCreators.getUserProfile());
  const data = await profileAPI.getProfile(userId);
  dispatch(actionCreators.setUserProfile(data));
};
export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfileStatus(userId);

  dispatch(actionCreators.setProfileStatus(data));
};
export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateProfileStatus(status);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.setProfileStatus(status));
  }
};
export const savePhoto = (file: string | Blob | RcFile): ThunkType => async (dispatch) => {
  // export const savePhoto = (file: UploadFile<unknown>): ThunkType => async (dispatch) => {
  // export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.savePhotoSuccess(data.data.photos));
  } else if (data.resultCode === ResultCodesEnum.Error) {
    const errorMessage = data.messages.length ? data.messages[0] : 'Image download fail';
    message.error(errorMessage)
  }
};
export const saveProfile = (profile: ProfileType, setErrors: Function): ThunkType => async (dispatch, getState) => {
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.saveProfileSuccess('success'))
    dispatch(getUserProfile(getState().auth.userId))
  } else if (data.resultCode === ResultCodesEnum.Error) {
    // const errorMessages = data.messages.length ? data.messages[0] : 'Wrong link';
    // (obj: { [key: string]: any}
    const errorMessages = data.messages.reduce((obj: Record<string, any>, item: string) => {
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
    // setStatus({errors: errorMessages})
    setErrors(errorMessages)
  }
};

export default profileReducer;
