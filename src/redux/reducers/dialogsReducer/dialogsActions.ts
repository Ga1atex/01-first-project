import { DialogsMessageType, DialogType } from "./dialogsReducer";

export enum dialogsActions {
  SEND_MESSAGE = 'dialogsPage/SEND_MESSAGE',
  SET_DIALOGS = 'dialogsPage/SET_DIALOGS',
  SET_MESSAGES = 'dialogsPage/SET_MESSAGES',
  ADD_MESSAGES = 'dialogsPage/ADD_MESSAGES',
  DELETE_MESSAGE = 'dialogsPage/DELETE_MESSAGE',
  ADD_MESSAGE_TO_SPAM = 'dialogsPage/ADD_MESSAGE_TO_SPAM',
  RESTORE_MESSAGE = 'dialogsPage/RESTORE_MESSAGE',
  TOGGLE_DIALOGS_FETCHING = 'dialogsPage/TOGGLE_DIALOGS_FETCHING',
  TOGGLE_MESSAGES_FETCHING = 'dialogsPage/TOGGLE_MESSAGES_FETCHING'
}
export const dialogsActionCreators = {
  sendMessage: (message: DialogsMessageType) => {
    return {
      type: dialogsActions.SEND_MESSAGE,
      payload: message
    } as const;
  },
  setDialogs: (data: DialogType[]) => {
    return {
      type: dialogsActions.SET_DIALOGS,
      payload: data
    } as const;
  },
  setMessages: (data: DialogsMessageType[]) => {
    return {
      type: dialogsActions.SET_MESSAGES,
      payload: data
    } as const;
  },
  deleteMessage: (messageId: string) => {
    return {
      type: dialogsActions.DELETE_MESSAGE,
      payload: messageId
    } as const;
  },
  addMessageToSpam: (messageId: string) => {
    return {
      type: dialogsActions.ADD_MESSAGE_TO_SPAM,
      payload: messageId
    } as const;
  },
  restoreMessage: (messageId: string) => {
    return {
      type: dialogsActions.RESTORE_MESSAGE,
      payload: messageId
    } as const;
  },
  addMessages: (data: DialogsMessageType[]) => {
    return {
      type: dialogsActions.ADD_MESSAGES,
      payload: data
    } as const;
  },
  toggleIsFetching: (type: typeof dialogsActions.TOGGLE_DIALOGS_FETCHING | typeof dialogsActions.TOGGLE_MESSAGES_FETCHING, isFetching: boolean) => {
    return {
      type: type,
      payload: isFetching
    } as const;
  },
};
