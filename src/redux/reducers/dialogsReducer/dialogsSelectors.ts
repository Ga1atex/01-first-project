import { AppStateType } from "../../store";

export const selectMessagesData = (state: AppStateType) => state.dialogsPage.messagesData;
export const selectDialogsData = (state: AppStateType) => state.dialogsPage.dialogsData;
export const selectDialogsFetching = (state: AppStateType) => state.dialogsPage.dialogsAreFetching;
export const selectMessagesFetching = (state: AppStateType) => state.dialogsPage.messagesAreFetching;
