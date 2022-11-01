import { MessageAPIType, StatusType } from '../../../api/chatAPI';
import { v1 as uuidv1 } from 'uuid';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ChatMessageType = MessageAPIType & { id: string };

const chatInitialState = {
  messages: [] as ChatMessageType[],
  status: 'pending' as StatusType,
};

export type ChatInitialStateType = typeof chatInitialState;

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    statusChanged: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    clearState: (state) => {
      state.messages = [];
    },
    messagesReceived: (state, action: PayloadAction<MessageAPIType[]>) => {
      const newMessages = action.payload
        .map((message) => ({ ...message, id: uuidv1() }))
        .filter((_, index, array) => index >= array.length - 100);

      state.messages.push(...newMessages);
    },
  },
  extraReducers(builder) {},
});

export const chatActionCreators = chatSlice.actions;
export default chatSlice.reducer;
