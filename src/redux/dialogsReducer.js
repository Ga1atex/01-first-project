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
  // textAreaText: ''
}

const dialogsReducer = (state = initialState, action) => {

  switch (action.type) {
    case SEND_MESSAGE: {
      const newState = {
        ...state,
        // textAreaText: '',
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

    default:
      return state;
  }
}

export const sendMessage = (text) => {
  return {
    type: SEND_MESSAGE,
    text
  };
};

export default dialogsReducer;
