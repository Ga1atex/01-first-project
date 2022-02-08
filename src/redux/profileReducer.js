import { profileAPI } from "../api/api";

const UPDATE_TEXT_VALUE = 'UPDATE_TEXT_VALUE';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_PROFILE_STATUS = 'SET_PROFILE_STATUS';

const initialState = {
  postsData: [
    { id: 1, message: 'Post1', likesCount: "431" },
    { id: 2, message: 'Hey', likesCount: "431" },
    { id: 3, message: 'Hi', likesCount: "431" },
    { id: 4, message: 'How is your day123', likesCount: "222" },
  ],
  textAreaText: '',
  profile: undefined,
  status: ''
}

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      const newState = {
        ...state,
        ...state.postsData
      };
      const newPost = {
        id: state.postsData.length + 1,
        message: state.textAreaText,
        likesCount: 0
      };

      newState.postsData.push(newPost);
      newState.textAreaText = '';

      return newState;
    }
    case UPDATE_TEXT_VALUE:{
      const newState = {
        ...state,
        textAreaText: action.text
      };
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
export const updateText = (text) => {
  return {
    type: UPDATE_TEXT_VALUE,
    text,
    page: 'profilePage'
  };
}
export const setUserProfile = (userId) => {
  return {
    type: SET_USER_PROFILE,
    profile: userId
  };
}
export const setProfileStatus = (status) => {
  return {
    type: SET_PROFILE_STATUS,
    status
  };
}

export const getUserProfile = (userId) => {
  return (dispatch) => {
    profileAPI.getProfile(userId)
      .then(data => {
        dispatch(setUserProfile(data));
      }
      );
  };
}

export const getProfileStatus = (userId) => {
  return dispatch => {
    // dispatch(toggleIsFetching(true));

    profileAPI.getProfileStatus(userId)
      .then(data => {
        // dispatch(toggleIsFetching(false));
        dispatch(setProfileStatus(data));
      });
  };
};

export const updateProfileStatus = (status) => {
  return dispatch => {
    // dispatch(toggleIsFetching(true));

    profileAPI.updateProfileStatus(status)
      .then(data => {
        if (data.resultCode === 0) {
        // dispatch(toggleIsFetching(false));
        dispatch(setProfileStatus(status));
        }
      });
  };
};

export default profileReducer;
