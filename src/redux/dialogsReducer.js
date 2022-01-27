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
  textAreaText: ''
}

const dialogsReducer = (state = initialState, action) => {
  // const newState = JSON.parse(JSON.stringify(state));

  // function updateTextValue(newText) {
  //   newState = {
  //     ...state,
  //     textAreaText: newText
  //   }
  // }

  // function sendMessage() {
  //   const newMessage = {
  //     id: newState.messagesData.length + 1,
  //     text: newState.textAreaText,
  //   };

  //   newState = {
  //   ...state,
  //   textAreaText: '',
  //     messagesData: [...state.messagesData, newMessage],
  // }

  // }

  switch (action.type) {
    case SEND_MESSAGE: {

      const newState = {
        ...state,
        textAreaText: '',
        messagesData: [...state.messagesData],
      };

      const newMessage = {
        id: newState.messagesData.length + 1,
        // text: state.textAreaText,
        text: action.text,
      };

      newState.messagesData.push(newMessage);
      // sendMessage(action.text);
      return newState;
    }

    case UPDATE_NEW_MESSAGE_VALUE: {
      // updateTextValue(action.text);
      const newState = {
        ...state,
        textAreaText: action.text,
      };

      return newState;
    }

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
