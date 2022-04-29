import { dialogsAPI } from "../../../api/dialogsAPI";
import { PhotosType } from "../../../types/types";
import { BaseThunkType, InferActionTypes } from "../../store";

const SEND_MESSAGE = 'dialogsPage/SEND_MESSAGE';
const SET_DIALOGS = 'dialogsPage/SET_DIALOGS';
const SET_CURRENT_DIALOG_ID = 'dialogsPage/SET_CURRENT_DIALOG_ID';
const SET_MESSAGES = 'dialogsPage/SET_MESSAGES';
const ADD_MESSAGES = 'dialogsPage/ADD_MESSAGES';
const DELETE_MESSAGE = 'dialogsPage/DELETE_MESSAGE';
const ADD_MESSAGE_TO_SPAM = 'dialogsPage/ADD_MESSAGE_TO_SPAM';
const RESTORE_MESSAGE = 'dialogsPage/RESTORE_MESSAGE';

export type DialogType = {
  id: number
  userName: string
  hasNewMessages: boolean
  lastDialogActivityDate: string
  lastUserActivityDate: string
  newMessagesCount: number
  photos: PhotosType
}

export type DialogsMessageType = {
  id: string
  body: string
  translatedBody: null
  addedAt: string,
  senderId: number
  senderName: string,
  recipientId: number,
  viewed: boolean
}

const initialState = {
  dialogsData: [] as Array<DialogType>,
  messagesData: [] as Array<DialogsMessageType>,
  currentDialogId: 0 as number
}

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actionCreators>

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {

  switch (action.type) {
    case SEND_MESSAGE: {
      const newState = {
        ...state,
        messagesData: [...state.messagesData, action.payload],
      };

      return newState;
    }
    case SET_DIALOGS: {
      const newState = {
        ...state,
        dialogsData: action.payload,
      };

      return newState;
    }
    case SET_CURRENT_DIALOG_ID: {
      const newState = {
        ...state,
        currentDialogId: action.payload
      };

      return newState;
    }
    case SET_MESSAGES: {
      const newState = {
        ...state,
        messagesData: action.payload
      };

      return newState;
    }
    case ADD_MESSAGES: {
      const newState = {
        ...state,
        messagesData: [...state.messagesData, ...action.payload],
      };

      return newState;
    }
    case DELETE_MESSAGE: {
      const newState = {
        ...state,
        messagesData: state.messagesData.filter(message => message.id !== action.payload)
      };

      return newState;
    }
    // case ADD_MESSAGE_TO_SPAM: {
    //   const newState = {
    //     ...state,
    //     messagesData: state.messagesData.filter(message => message.id !== action.payload)
    //   };

    //   return newState;
    // }
    default:
      return state;
  }
}

export const actionCreators = {
  sendMessage: (message: DialogsMessageType) => {
    return {
      type: SEND_MESSAGE,
      payload: message
    } as const
  },
  setDialogs: (data: DialogType[]) => {
    return {
      type: SET_DIALOGS,
      payload: data
    } as const
  },
  setCurrentDialogId: (id: number) => {
    return {
      type: SET_CURRENT_DIALOG_ID,
      payload: id
    } as const
  },
  setMessages: (data: DialogsMessageType[]) => {
    return {
      type: SET_MESSAGES,
      payload: data
    } as const
  },
  deleteMessage: (messageId: string) => {
    return {
      type: DELETE_MESSAGE,
      payload: messageId
    } as const
  },
  addMessageToSpam: (messageId: string) => {
    return {
      type: ADD_MESSAGE_TO_SPAM,
      payload: messageId
    } as const
  },
  restoreMessage: (messageId: string) => {
    return {
      type: RESTORE_MESSAGE,
      payload: messageId
    } as const
  },
  addMessages: (data: DialogsMessageType[]) => {
    return {
      type: ADD_MESSAGES,
      payload: data
    } as const
  },
}

type ThunkType = BaseThunkType<ActionsTypes>

export const requestDialogs = (): ThunkType => {
  return async (dispatch) => {
    // dispatch(actionCreators.toggleIsFetching(true))
    const data = await dialogsAPI.getDialogs()
    // dispatch(actionCreators.toggleIsFetching(false))
    dispatch(actionCreators.setDialogs(data))
  }
}

export const startDialog = (userId: number): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.startDialog(userId);

  dispatch(actionCreators.setCurrentDialogId(userId))
  dispatch(requestDialogs());

  const resData = await dialogsAPI.getMessages(userId);
  dispatch(actionCreators.setMessages(resData.items))
}

export const sendMessage = (userId: number, message: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.sendMessage(userId, message);
  dispatch(actionCreators.sendMessage(data.data.message));
}

export const deleteMessage = (messageId: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.deleteMessageForOwner(messageId);
  dispatch(actionCreators.deleteMessage(messageId));
}

export const restoreMessage = (messageId: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.restoreMessage(messageId);
  dispatch(actionCreators.sendMessage(data.data.message));
}

export const addMessageToSpam = (messageId: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.addMessageToSpam(messageId);

  dispatch(actionCreators.addMessageToSpam(messageId));
}

export const getMessagesNewerThen = (userId: number, date: string): ThunkType => async (dispatch) => {
  const data = await dialogsAPI.getMessagesNewerThen(userId, date);

  dispatch(actionCreators.setMessages(data));
}
export default dialogsReducer;
