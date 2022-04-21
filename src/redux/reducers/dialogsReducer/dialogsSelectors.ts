import { AppStateType } from "../../store";

export const selectMessagesData = (state: AppStateType) => state.dialogsPage.messagesData;
export const selectDialogsData = (state: AppStateType) => state.dialogsPage.dialogsData;
