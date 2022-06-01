import { PhotosType } from "../../../types/types";
import { InferActionTypes } from "../../store";
import { dialogsActionCreators, dialogsActions } from "./dialogsActions";

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

const dialogsInitialState = {
  dialogsData: [] as Array<DialogType>,
  messagesData: [] as Array<DialogsMessageType>,
  dialogsAreFetching: false,
  messagesAreFetching: false,
}

export type DialogsInitialStateType = typeof dialogsInitialState

export type ActionsTypes = InferActionTypes<typeof dialogsActionCreators>

const dialogsReducer = (state = dialogsInitialState, action: ActionsTypes): DialogsInitialStateType => {

  switch (action.type) {
    case dialogsActions.SEND_MESSAGE: {
      return {
        ...state,
        messagesData: [...state.messagesData, action.payload],
      };
    }
    case dialogsActions.SET_DIALOGS: {
      return {
        ...state,
        dialogsData: action.payload,
      };
    }
    case dialogsActions.SET_MESSAGES: {
      return {
        ...state,
        messagesData: action.payload
      };
    }
    case dialogsActions.ADD_MESSAGES: {
      return {
        ...state,
        messagesData: [...state.messagesData, ...action.payload],
      };
    }
    case dialogsActions.DELETE_MESSAGE: {
      return {
        ...state,
        messagesData: state.messagesData.filter(message => message.id !== action.payload)
      };
    }
    // case ADD_MESSAGE_TO_SPAM: {
    //   return {
    //     ...state,
    //     messagesData: state.messagesData.filter(message => message.id !== action.payload)
    //   };
    // }
    case dialogsActions.TOGGLE_DIALOGS_FETCHING: {
      return {
        ...state,
        dialogsAreFetching: action.payload
      };
    }
    case dialogsActions.TOGGLE_MESSAGES_FETCHING: {
      return {
        ...state,
        messagesAreFetching: action.payload
      };
    }
    default:
      return state;
  }
}
export default dialogsReducer;
