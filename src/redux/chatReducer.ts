import { Dispatch } from 'redux';
import { chatAPI, ChatMessageAPIType, StatusType } from '../api/chatAPI';
import { BaseThunkType, InferActionTypes } from './redux-store';
import { v1 as uuidv1 } from 'uuid';

const MESSAGES_RECEIVED = 'social-network/chat/MESSAGES_RECEIVED';
const STATUS_CHANGED = 'social-network/chat/STATUS_CHANGED';

type ChatMessageType = ChatMessageAPIType & {id: string}

const initialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType
};

export type InitialStateType = typeof initialState

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case MESSAGES_RECEIVED: {
      const newState = {
        ...state,
        messages: [...state.messages, ...action.payload.messages.map(m => ({...m, id: uuidv1
          ()}))]
          // ()}))].filter((m, index, array) => index >= array.length - 100)
          // BUG: messages are repeating when switch to other pages and back when amount of messages is less then 100, also problem might be in ID
      };
      return newState;
    }
    case STATUS_CHANGED: {
      const newState = {
        ...state,
        status: action.payload.status
      };
      return newState;
    }
    default:
      return state;
  }
};

type ActionsTypes = InferActionTypes<typeof actionCreators>

// Action Creators
export const actionCreators = {
  messagesReceived: (messages: ChatMessageAPIType[]) => {
    return {
      type: MESSAGES_RECEIVED,
      payload: { messages }
    } as const
  },
  statusChanged: (status: StatusType) => {
    return {
      type: STATUS_CHANGED,
      payload: { status }
    } as const
  }

}

type ThunkType = BaseThunkType<ActionsTypes>

let _newMessageHandler: ((messages: ChatMessageAPIType[]) => void) | null = null
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(actionCreators.messagesReceived(messages));
    }
  }
  return _newMessageHandler
}

let _statusChangedHandler: ((status: StatusType) => void) | null = null
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(actionCreators.statusChanged(status));
    }
  }
  return _statusChangedHandler
}

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start()
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch))
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch))
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received',newMessageHandlerCreator(dispatch))
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch))
  chatAPI.stop()
};
export const sendMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message)
};

export default chatReducer;
