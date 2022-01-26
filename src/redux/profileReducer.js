const UPDATE_TEXT_VALUE = 'UPDATE-TEXT-VALUE';
const ADD_POST = 'ADD-POST';


export const addPostActionCreator = (text) => {
  return {
    type: ADD_POST,
    text
  };
};
export const updateTextActionCreator = (text, pageName) => {
  return {
    type: UPDATE_TEXT_VALUE,
    text,
    page: pageName
  };
}
const profileReducer = (state, action) => {
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

  function updateTextValue(newText, page) {
    state.textAreaText = newText;
  }

  switch (action.type) {
    case ADD_POST:
      addPost();
      return state;
    case UPDATE_TEXT_VALUE:
      updateTextValue(action.text, action.page);
      return state;
    default:
      return state;
  }
};

export default profileReducer;
