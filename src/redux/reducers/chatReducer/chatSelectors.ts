import { AppStateType } from "../../store"


export const selectChatStatus = (state: AppStateType) => state.chat.status
export const selectChatMessages = (state: AppStateType) => state.chat.messages
