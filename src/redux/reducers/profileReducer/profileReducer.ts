import { PostType, ProfileType } from '../../../types/types';
import { InferActionTypes } from '../../store';
import { profileActionCreators, profileActions } from './profileActions';

const profileInitialState = {
  postsData: [] as Array<PostType>,
  profile: null as ProfileType | null,
  profileUpdateStatus: 'none',
  status: '',
  isFetching: false
};

export type ProfileInitialStateType = typeof profileInitialState

export type ProfileActionsType = InferActionTypes<typeof profileActionCreators>

const profileReducer = (state = profileInitialState, action: ProfileActionsType): ProfileInitialStateType => {
  switch (action.type) {
    case profileActions.ADD_POST: {
      const newPost = {
        id: state.postsData.length + 1,
        message: action.payload.text,
        likesCount: 0,
        isLiked: false,
        avatarImage: action.payload.avatar,
        userName: action.payload.userName,
        userId: action.payload.userId,
      };

      return {
        ...state,
        postsData: [...state.postsData, newPost]
      };
    }
    case profileActions.GET_USER_PROFILE: {
      return {
        ...state,
        isFetching: true
      };
    }
    case profileActions.SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
        isFetching: false
      };
    }
    case profileActions.ADD_LIKE: {
      return {
        ...state,
        postsData: state.postsData.map(item => {
          if (item.id === action.payload) {
            item.likesCount += 1;
            item.isLiked = true;
          }
          return item
        })
      };
    }
    case profileActions.REMOVE_LIKE: {
      return {
        ...state,
        postsData: state.postsData.map(item => {
          if (item.id === action.payload) {
            item.likesCount -= 1;
            item.isLiked = false;
          }
          return item
        })
      };
    }
    case profileActions.SET_PROFILE_STATUS: {
      return {
        ...state,
        status: action.status
      };
    }
    case profileActions.DELETE_POST: {
      return {
        ...state,
        postsData: state.postsData.filter(user => user.id !== action.postId)
      };
    }
    case profileActions.SAVE_PHOTO_SUCCESS: {
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as ProfileType
      };
    }
    case profileActions.SAVE_PROFILE_SUCCESS: {
      return {
        ...state,
        profileUpdateStatus: action.profileUpdateStatus
      };
    }
    default:
      return state;
  }
};

export default profileReducer;
