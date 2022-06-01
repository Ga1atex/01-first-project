import { dialogsAPI } from "../../../api/dialogsAPI";
import { BaseThunkType } from "../../store";
import { dialogsActionCreators, dialogsActions } from "./dialogsActions";
import { ActionsTypes } from "./dialogsReducer";

type ThunkType = BaseThunkType<ActionsTypes>;

export const requestDialogs = (): ThunkType => {
  return async (dispatch) => {
    dispatch(dialogsActionCreators.toggleIsFetching(dialogsActions.TOGGLE_DIALOGS_FETCHING, true));
    const data = await dialogsAPI.getDialogs();
    dispatch(dialogsActionCreators.setDialogs(data));
    dispatch(dialogsActionCreators.toggleIsFetching(dialogsActions.TOGGLE_DIALOGS_FETCHING, false));
  };
};

export const getMessages = (userId: number, isNewDialog: boolean = false): ThunkType => async (dispatch) => {
  dispatch(dialogsActionCreators.toggleIsFetching(dialogsActions.TOGGLE_MESSAGES_FETCHING, true));

  if (isNewDialog) {
    const data = await dialogsAPI.startDialog(userId);
    // dispatch(requestDialogs())
  }

  const resData = await dialogsAPI.getMessages(userId);
  dispatch(dialogsActionCreators.setMessages(resData.items));
  dispatch(dialogsActionCreators.toggleIsFetching(dialogsActions.TOGGLE_MESSAGES_FETCHING, false));

};

export const sendMessage = (userId: number, message: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.sendMessage(userId, message);
  dispatch(dialogsActionCreators.sendMessage(data.data.message));
  // dispatch(requestDialogs());
};

export const deleteMessage = (messageId: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.deleteMessageForOwner(messageId);
  dispatch(dialogsActionCreators.deleteMessage(messageId));
};

export const restoreMessage = (messageId: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.restoreMessage(messageId);
  dispatch(dialogsActionCreators.sendMessage(data.data.message));
};

export const addMessageToSpam = (messageId: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.addMessageToSpam(messageId);

  dispatch(dialogsActionCreators.addMessageToSpam(messageId));
};

export const getMessagesNewerThen = (userId: number, date: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.getMessagesNewerThen(userId, date);

  dispatch(dialogsActionCreators.setMessages(data));
};
