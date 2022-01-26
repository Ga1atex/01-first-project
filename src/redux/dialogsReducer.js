const UPDATE_TEXT_VALUE = 'UPDATE-TEXT-VALUE';
const SEND_MESSAGE = 'SEND-MESSAGE';

const dialogsReducer = (state, action) => {


  function updateTextValue(newText, page) {
    state.textAreaText = newText;
  }

  function sendMessage(message) {
    const newMessage = {
      id: state.messagesData.length + 1,
      // message: postMessage,
      text: state.textAreaText,
    };

    state.messagesData.push(newMessage);
    state.textAreaText = '';
  }
  switch (action.type) {
    case SEND_MESSAGE:
      sendMessage(action.text);
      return state;
    case UPDATE_TEXT_VALUE:
      updateTextValue(action.text, action.page);
      return state;
    default:
      return state;
  }
}

export const sendMessageActionCreator = (text) => {
  return {
    type: SEND_MESSAGE,
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
export default dialogsReducer;
