import { MessageAPIType } from "../../../api/chatAPI";
import { InferActionTypes } from "../../store";

const SEND_MESSAGE = 'social-network/dialogsPage/SEND_MESSAGE';

type DialogType = {
  id: number,
  name: string
}

type MessageType = MessageAPIType & {id: string}

const initialState = {
  dialogsData: [
    { id: 1, name: 'Igor' },
    { id: 2, name: 'Andrey' },
    { id: 3, name: 'Ruslan' },
    { id: 4, name: 'Valeriy' },
  ] as Array<DialogType>,
  messagesData: [
    { id: '1', message: 'How is your day', userId: 1, userName: 'Igor', photo: '' },
    { id: '2', message: 'Hey', userId: 1, userName: 'Igor', photo: '' },
    { id: '3', message: 'Hi', userId: 1, userName: 'Igor', photo: '' },
    { id: '4', message: 'How is your day123', userId: 1, userName: 'Igor', photo: '' },
  ] as Array<MessageType>,
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actionCreators>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case SEND_MESSAGE: {
      const newState = {
        ...state,
        messagesData: [...state.messagesData],
      };

      const newMessage = {
        id: `${newState.messagesData.length + 1}`,
        message: action.text,
        photo: '',
        userName: '',
        userId: 1
      };

      newState.messagesData.push(newMessage);
      return newState;
    }

    default:
      return state;
  }
}

export const actionCreators = {
  sendMessage: (text: string) => {
    return {
      type: SEND_MESSAGE,
      text
    } as const
  }
}

export default dialogsReducer;
