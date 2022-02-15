import { profileAPI } from "../api/api";

const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';
const DELETE_POST = 'DELETE_POST';

const initialState = {
  postsData: [
    { id: 1, message: 'Post1', likesCount: "431" },
    { id: 2, message: 'Hey', likesCount: "431" },
    { id: 3, message: 'Hi', likesCount: "431" },
    { id: 4, message: 'How is your day123', likesCount: "222" },
  ],
  profile: null,
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

export const getUserProfile = (userId) => async (dispatch) => {
  const data = await profileAPI.getProfile(userId);
  dispatch(setUserProfile(data));
};


export const getProfileStatus = (userId) => async (dispatch) => {
  // dispatch(toggleIsFetching(true));

  const data = await profileAPI.getProfileStatus(userId);
  // dispatch(toggleIsFetching(false));
  dispatch(setProfileStatus(data));
};


export const updateProfileStatus = (status) => async (dispatch) => {
  // dispatch(toggleIsFetching(true));

  const data = await profileAPI.updateProfileStatus(status);
  if (data.resultCode === 0) {
    // dispatch(toggleIsFetching(false));
    dispatch(setProfileStatus(status));
  }
};

export default profileReducer;
