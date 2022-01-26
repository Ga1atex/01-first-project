const UPDATE_TEXT_VALUE = 'UPDATE_TEXT_VALUE';
const ADD_POST = 'ADD_POST';

export const addPostActionCreator = (text) => {
  return {
    type: ADD_POST,
    text
  };
};
export const updateTextActionCreator = (text) => {
  return {
    type: UPDATE_TEXT_VALUE,
    text,
    page: 'profilePage'
  };
}

const initialState = {
  postsData: [
    { id: 1, message: 'Post1', likesCount: "431" },
    { id: 2, message: 'Hey', likesCount: "431" },
    { id: 3, message: 'Hi', likesCount: "431" },
    { id: 4, message: 'How is your day123', likesCount: "222" },
  ],
  textAreaText: 'profile'
}

const profileReducer = (state = initialState, action) => {
  function addPost(postMessage) {
    const newPost = {
      id: state.postsData.length + 1,
      // message: action.postMessage,
      message: state.textAreaText,
      likesCount: 0
    };

    state.postsData.push(newPost);
    state.textAreaText = '';
  }

  function updateTextValue(newText) {
    state.textAreaText = newText;
  }

  switch (action.type) {
    case ADD_POST:
      addPost();
      return state;
    case UPDATE_TEXT_VALUE:
      updateTextValue(action.text);
      return state;
    default:
      return state;
  }
};

export default profileReducer;
