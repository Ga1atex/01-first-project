import { createAsyncThunk } from '@reduxjs/toolkit';
import { dialogsAPI } from '../../../api/dialogsAPI';

export const requestDialogs = createAsyncThunk(
  'dialogs/requestDialogs',
  async (_, thunkAPI) => {
    const response = await dialogsAPI.getDialogs();

    return response;
  }
);

export const getMessages = createAsyncThunk(
  'dialogs/getMessages',
  async ({
    userId,
    isNewDialog = false,
  }: {
    userId: number;
    isNewDialog: boolean;
  }) => {
    if (isNewDialog) {
      await dialogsAPI.startDialog(userId);
    }

    const resData = await dialogsAPI.getMessages(userId);
    return resData.items;
  }
);

export const sendMessage = createAsyncThunk(
  'dialogs/sendMessage',
  async ({ userId, message }: { userId: number; message: string }) => {
    const response = await dialogsAPI.sendMessage(userId, message);

    return response.data.message;
  }
);

export const deleteMessage = createAsyncThunk(
  'dialogs/deleteMessage',
  async (messageId: string) => {
    await dialogsAPI.deleteMessageForOwner(messageId);

    return messageId;
  }
);

export const restoreMessage = createAsyncThunk(
  'dialogs/restoreMessage',
  async (messageId: string) => {
    const response = await dialogsAPI.restoreMessage(messageId);

    return response.data.message;
  }
);

export const addMessageToSpam = createAsyncThunk(
  'dialogs/addMessageToSpam',
  async (messageId: string) => {
    await dialogsAPI.addMessageToSpam(messageId);

    return messageId;
  }
);

export const getMessagesNewerThen = createAsyncThunk(
  'dialogs/getMessagesNewerThen',
  async ({ userId, date }: { userId: number; date: string }, thunkAPI) => {
    const response = await dialogsAPI.getMessagesNewerThen(userId, date);

    return response;
  }
);
