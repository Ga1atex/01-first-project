import { Dispatch } from 'redux';
import { chatAPI, MessageAPIType, StatusType } from '../../../api/chatAPI';
import { BaseThunkType } from '../../store';
import { chatActionCreators } from './chatActions';
import { ActionsTypes } from './chatReducer';

type ThunkType = BaseThunkType<ActionsTypes>;
let _newMessageHandler: ((messages: MessageAPIType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatActionCreators.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};
let _statusChangedHandler: ((status: StatusType) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(chatActionCreators.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.start();
  chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
};
export const stopMessagesListening = (): ThunkType => async (dispatch) => {
  chatAPI.unsubscribe('messages-received', newMessageHandlerCreator(dispatch));
  chatAPI.unsubscribe('status-changed', statusChangedHandlerCreator(dispatch));
  chatAPI.stop();
};
export const sendChatMessage = (message: string): ThunkType => async (dispatch) => {
  chatAPI.sendMessage(message);
};
