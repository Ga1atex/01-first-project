import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BasePostType,
  PhotosType,
  PostType,
  ProfileType,
} from '../../../types/types';
import {
  getProfileStatus,
  getUserProfile,
  savePhoto,
  saveProfile,
  updateProfileStatus,
} from './profileThunks';

const profileInitialState = {
  postsData: [] as Array<PostType>,
  profile: null as ProfileType | null,
  profileUpdateStatus: 'none',
  status: '',
  isFetching: false,
};

// export type ProfileInitialStateType = typeof profileInitialState;

export const profileSlice = createSlice({
  name: 'profile',
  initialState: profileInitialState,
  reducers: {
    addPost(state, action: PayloadAction<BasePostType>) {
      const { message, avatarImage, userName, userId } = action.payload;
      const newPost = {
        id: state.postsData.length + 1,
        message: message,
        likesCount: 0,
        isLiked: false,
        avatarImage: avatarImage,
        userName: userName,
        userId: userId,
      };

      state.postsData.push(newPost);
    },
    deletePost(state, action: PayloadAction<number>) {
      state.postsData = state.postsData.filter(
        (user) => user.id !== action.payload
      );
    },
    addLike(state, action: PayloadAction<number>) {
      state.postsData = state.postsData.map((item) => {
        if (item.id === action.payload) {
          item.likesCount += 1;
          item.isLiked = true;
        }
        return item;
      });
    },
    removeLike(state, action: PayloadAction<number>) {
      state.postsData = state.postsData.map((item) => {
        if (item.id === action.payload) {
          item.likesCount -= 1;
          item.isLiked = false;
        }
        return item;
      });
    },
    setProfileUpdateStatus(state, action: PayloadAction<string>) {
      state.profileUpdateStatus = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(
        getUserProfile.fulfilled,
        (state, action: PayloadAction<ProfileType>) => {
          state.isFetching = false;
          state.profile = action.payload;
        }
      )
      .addCase(
        getProfileStatus.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = action.payload;
        }
      )
      .addCase(
        updateProfileStatus.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = action.payload;
        }
      )
      .addCase(
        savePhoto.fulfilled,
        (state, action: PayloadAction<PhotosType>) => {
          state.profile!.photos = action.payload;
        }
      )
      .addCase(
        saveProfile.fulfilled,
        (state, action: PayloadAction<ProfileType>) => {
          state.profile = action.payload;
        }
      );
  },
});

export const profileActionCreators = profileSlice.actions;
export default profileSlice.reducer;

// export type ProfileActionsType = InferActionTypes<typeof profileActionCreators>;

// const profileReducer = (
//   state = profileInitialState,
//   action: ProfileActionsType
// ): ProfileInitialStateType => {
//   switch (action.type) {
//     case profileActions.ADD_POST: {
//       const newPost = {
//         id: state.postsData.length + 1,
//         message: action.payload.text,
//         likesCount: 0,
//         isLiked: false,
//         avatarImage: action.payload.avatar,
//         userName: action.payload.userName,
//         userId: action.payload.userId,
//       };

//       return {
//         ...state,
//         postsData: [...state.postsData, newPost],
//       };
//     }
//     case profileActions.GET_USER_PROFILE: {
//       return {
//         ...state,
//         isFetching: true,
//       };
//     }
//     case profileActions.SET_USER_PROFILE: {
//       return {
//         ...state,
//         profile: action.profile,
//         isFetching: false,
//       };
//     }
//     case profileActions.ADD_LIKE: {
//       return {
//         ...state,
//         postsData: state.postsData.map((item) => {
//           if (item.id === action.payload) {
//             item.likesCount += 1;
//             item.isLiked = true;
//           }
//           return item;
//         }),
//       };
//     }
//     case profileActions.REMOVE_LIKE: {
//       return {
//         ...state,
//         postsData: state.postsData.map((item) => {
//           if (item.id === action.payload) {
//             item.likesCount -= 1;
//             item.isLiked = false;
//           }
//           return item;
//         }),
//       };
//     }
//     case profileActions.SET_PROFILE_STATUS: {
//       return {
//         ...state,
//         status: action.status,
//       };
//     }
//     case profileActions.DELETE_POST: {
//       return {
//         ...state,
//         postsData: state.postsData.filter((user) => user.id !== action.postId),
//       };
//     }
//     case profileActions.SAVE_PHOTO_SUCCESS: {
//       return {
//         ...state,
//         profile: { ...state.profile, photos: action.photos } as ProfileType,
//       };
//     }
//     case profileActions.SAVE_PROFILE_SUCCESS: {
//       return {
//         ...state,
//         profileUpdateStatus: action.profileUpdateStatus,
//       };
//     }
//     default:
//       return state;
//   }
// };
