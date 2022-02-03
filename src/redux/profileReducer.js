const UPDATE_TEXT_VALUE = 'UPDATE_TEXT_VALUE';
const ADD_POST = 'ADD_POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';

const initialState = {
  postsData: [
    { id: 1, message: 'Post1', likesCount: "431" },
    { id: 2, message: 'Hey', likesCount: "431" },
    { id: 3, message: 'Hi', likesCount: "431" },
    { id: 4, message: 'How is your day123', likesCount: "222" },
  ],
  textAreaText: '',
  profile: undefined
}

const profileReducer = (state = initialState, action) => {
  // const newState = JSON.parse(JSON.stringify(state));
  // const newState = {
  //   ...state,
  //   ...state.postsData
  // };
  // function addPost(postMessage) {
  //   const newPost = {
  //     id: state.postsData.length + 1,
  //     // message: action.postMessage,
  //     message: state.textAreaText,
  //     likesCount: 0
  //   };

  //   newState.postsData.push(newPost);
  //   newState.textAreaText = '';
  // }

  // function updateTextValue(newText) {
  //   newState.textAreaText = newText;
  // }

  switch (action.type) {
    case ADD_POST: {
      const newState = {
        ...state,
        ...state.postsData
      };
      const newPost = {
        id: state.postsData.length + 1,
        // message: action.postMessage,
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
export const setUserProfile = (profile) => {
  return {
    type: SET_USER_PROFILE,
    profile
  };
}
export default profileReducer;
