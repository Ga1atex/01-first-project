import { createSlice } from "@reduxjs/toolkit";
import { PhotosType } from "../../../types/types";
import { InferActionTypes } from "../../store";

import {
  deleteMessage,
  getMessages,
  getMessagesNewerThen,
  requestDialogs,
  sendMessage,
} from "./dialogsThunks";

export type DialogType = {
  id: number;
  userName: string;
  hasNewMessages: boolean;
  lastDialogActivityDate: string;
  lastUserActivityDate: string;
  newMessagesCount: number;
  photos: PhotosType;
};

export type DialogsMessageType = {
  id: string;
  body: string;
  translatedBody: null;
  addedAt: string;
  senderId: number;
  senderName: string;
  recipientId: number;
  viewed: boolean;
};

const dialogsInitialState = {
  dialogsData: [] as Array<DialogType>,
  messagesData: [] as Array<DialogsMessageType>,
  dialogsAreFetching: false,
  messagesAreFetching: false,
};

export type DialogsInitialStateType = typeof dialogsInitialState;

export const dialogsSlice = createSlice({
  name: "dialogs",
  initialState: dialogsInitialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getMessages.pending, (state, action) => {
        state.messagesAreFetching = true;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.messagesAreFetching = false;
        state.messagesData = action.payload;
      })
      .addCase(requestDialogs.pending, (state, action) => {
        state.dialogsAreFetching = true;
      })
      .addCase(requestDialogs.fulfilled, (state, action) => {
        state.dialogsAreFetching = false;
        state.dialogsData = action.payload;
      })
      .addCase(getMessagesNewerThen.fulfilled, (state, action) => {
        state.messagesData = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messagesData = state.messagesData.filter(
          (message) => message.id !== action.payload
        );
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messagesData.push(action.payload);
      });
  },
});

export const dialogsActionCreators = dialogsSlice.actions;
export default dialogsSlice.reducer;
