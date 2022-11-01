import { DialogsMessageType, DialogType } from '../types/types';
import { APIResponseType, instance } from './api';

export type GetMessagesResponseType = {
  items: [];
  totalCount: number;
  error: null | string;
};

type GetMessageType = {
  message: DialogsMessageType;
};

export const dialogsAPI = {
  async getDialogs() {
    const response = await instance.get<DialogType[]>('dialogs');
    return response.data;
  },
  async startDialog(userId: number) {
    const response = await instance.put<APIResponseType>(`dialogs/${userId}`);
    return response.data;
  },
  async getMessages(userId: number) {
    const response = await instance.get<GetMessagesResponseType>(
      `dialogs/${userId}/messages`
    );
    return response.data;
  },
  async sendMessage(userId: number, body: string) {
    const response = await instance.post<APIResponseType<GetMessageType>>(
      `dialogs/${userId}/messages`,
      { body }
    );
    return response.data;
  },
  async getNewMessagesCount() {
    const response = await instance.get<number>('dialogs/messages/new/count');
    return response.data;
  },
  async getMessagesNewerThen(userId: number, date: string) {
    const response = await instance.get(
      `dialogs/${userId}/messages/new?newerThen=${date}`
    );
    return response.data;
  },
  async deleteMessageForOwner(messageId: string) {
    const response = await instance.delete<APIResponseType>(
      `dialogs/messages/${messageId}`
    );
    return response.data;
  },
  async restoreMessage(messageId: string) {
    const response = await instance.put<APIResponseType<GetMessageType>>(
      `dialogs/messages/${messageId}/restore`
    );
    return response.data;
  },
  async addMessageToSpam(messageId: string) {
    const response = await instance.post<APIResponseType>(
      `dialogs/messages/${messageId}/spam`
    );
    return response.data;
  },
};
