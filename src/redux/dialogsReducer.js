const UPDATE_NEW_MESSAGE_VALUE = 'UPDATE_NEW_MESSAGE_VALUE';
const SEND_MESSAGE = 'SEND_MESSAGE';

const initialState = {
  dialogsData: [
    { id: 1, name: 'Igor' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Ruslan' },
    { id: 4, name: 'Valeriy' },
  ],
  messagesData: [
    { id: 1, text: 'How is your day' },
    { id: 2, text: 'Hey' },
    { id: 3, text: 'Hi' },
    { id: 4, text: 'How is your day123' },
  ],
  textAreaText: 'dialogs'
}

const dialogsReducer = (state = initialState, action) => {
  function updateTextValue(newText) {
    state.textAreaText = newText;
  }

  function sendMessage() {
    const newMessage = {
      id: state.messagesData.length + 1,
      text: state.textAreaText,
    };

    state.messagesData.push(newMessage);
    state.textAreaText = '';
  }

  switch (action.type) {
    case SEND_MESSAGE:
      sendMessage(action.text);
      return state;
    case UPDATE_NEW_MESSAGE_VALUE:
      updateTextValue(action.text);
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

export const updateTextActionCreator = (text) => {
  return {
    type: UPDATE_NEW_MESSAGE_VALUE,
    text
  };
}
export default dialogsReducer;
