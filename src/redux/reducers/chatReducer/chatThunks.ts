import { createAsyncThunk } from '@reduxjs/toolkit';
import { Dispatch } from 'redux';
import {
  chatAPI,
  MessagesReceivedSubscriberType,
  StatusChangedSubscriberType,
} from '../../../api/chatAPI';
import { chatActionCreators } from './chatReducer';

let _newMessageHandler: MessagesReceivedSubscriberType | null = null;
let _statusChangedHandler: StatusChangedSubscriberType | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages) => {
      dispatch(chatActionCreators.messagesReceived(messages));
    };
  }

  return _newMessageHandler;
};

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status) => {
      dispatch(chatActionCreators.statusChanged(status));
    };
  }

  return _statusChangedHandler;
};

export const startMessagesListening = createAsyncThunk(
  'chat/startMessagesListening',
  async (_, { dispatch }) => {
    chatAPI.start();
    chatAPI.subscribe('messages-received', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('status-changed', statusChangedHandlerCreator(dispatch));
  }
);

export const stopMessagesListening = createAsyncThunk(
  'chat/stopMessagesListening',
  async (_, { dispatch }) => {
    chatAPI.unsubscribe(
      'messages-received',
      newMessageHandlerCreator(dispatch)
    );
    chatAPI.unsubscribe(
      'status-changed',
      statusChangedHandlerCreator(dispatch)
    );
    chatAPI.stop();
  }
);

export const sendChatMessage = createAsyncThunk(
  'chat/sendChatMessage',
  async (message: string) => {
    chatAPI.sendMessage(message);
  }
);
