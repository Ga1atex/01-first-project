import { stopSubmit } from 'redux-form';
import { profileAPI } from '../api/api';

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';
const DELETE_POST = 'DELETE_POST';
const SAVE_PHOTO_SUCCESS = 'SAVE_PHOTO_SUCCESS';
const SAVE_PROFILE_SUCCESS = 'SAVE_PROFILE_SUCCESS';

const initialState = {
  postsData: [
    { id: 1, message: 'Post1', likesCount: '431' },
    { id: 2, message: 'Hey', likesCount: '431' },
    { id: 3, message: 'Hi', likesCount: '431' },
    { id: 4, message: 'How is your day123', likesCount: '222' },
  ],
  profile: null,
  profileUpdateStatus: 'none',
  status: ''
};

const profileReducer = (state = initialState, action) => {
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
        profile: {...state.profile, photos: action.photos}
      };
      return newState;
    }
    case SAVE_PROFILE_SUCCESS: {
      const newState = {
        ...state,
        updateProfileStatus: action.status
      };
      return newState;
    }

    default:
      return state;
  }
};

//Action creators
export const addPost = (text) => {
  return {
    type: ADD_POST,
    text
  };
};
export const setUserProfile = (userId) => {
  return {
    type: SET_USER_PROFILE,
    profile: userId
  };
};
export const setProfileStatus = (status) => {
  return {
    type: SET_PROFILE_STATUS,
    status
  };
};
export const deletePost = (postId) => {
  return {
    type: DELETE_POST,
    postId
  };
};
export const savePhotoSuccess = (photos) => {
  return {
    type: SAVE_PHOTO_SUCCESS,
    photos
  };
};
export const saveProfileSuccess = (status) => {
  return {
    type: SAVE_PROFILE_SUCCESS,
    status
  };
};

export const getUserProfile = (userId) => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};
export const getProfileStatus = (userId) => async (dispatch) => {
  const data = await profileAPI.getProfileStatus(userId);

  dispatch(setProfileStatus(data));
};
export const updateProfileStatus = (status) => async (dispatch) => {
  const data = await profileAPI.updateProfileStatus(status);

  if (data.resultCode === 0) {
    dispatch(setProfileStatus(status));
  }
};
export const savePhoto = (file) => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === 0) {
    dispatch(savePhotoSuccess(data.data.photos));
  } else if (data.resultCode === 1) {
    const errorMessage = data.messages.length ? data.messages[0] : 'Image download fail';
    alert(errorMessage)
  }
};
export const saveProfile = (profile) => async (dispatch, getState) => {
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === 0) {
    dispatch(saveProfileSuccess('success'))
    dispatch(getUserProfile(getState().auth.userId))
  } else if (data.resultCode === 1) {
    // const errorMessages = data.messages.length ? data.messages[0] : 'Wrong link';

    const errorMessages = data.messages.reduce(function (obj, item) {
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
    dispatch(stopSubmit('edit-profile', errorMessages));

    // return Promise.reject(data.messages[0]);
  }
};

export default profileReducer;
