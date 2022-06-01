import { MessageAPIType, StatusType } from '../../../api/chatAPI';
import { InferActionTypes } from '../../store';
import { v1 as uuidv1 } from 'uuid';
import { chatActions, chatActionCreators } from './chatActions';

export type ChatMessageType = MessageAPIType & { id: string }

const chatInitialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
};

export type ChatInitialStateType = typeof chatInitialState

const chatReducer = (state = chatInitialState, action: ActionsTypes): ChatInitialStateType => {
  switch (action.type) {
    case chatActions.MESSAGES_RECEIVED: {
      const newState = {
        ...state,
        messages: [...state.messages, ...action.payload.messages]
          .map(m => ({ ...m, id: uuidv1() }))
          .filter((m, index, array) => index >= array.length - 100)
      };
      return newState;
    }
    case chatActions.STATUS_CHANGED: {
      const newState = {
        ...state,
        status: action.payload.status
      };
      return newState;
    }
    case chatActions.CLEAR_STATE: {
      const newState = {
        ...state,
        messages: []
      };
      return newState;
    }
    default:
      return state;
  }
};

export type ActionsTypes = InferActionTypes<typeof chatActionCreators>
export default chatReducer;
