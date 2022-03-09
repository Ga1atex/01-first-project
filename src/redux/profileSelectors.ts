// import { createSelector } from 'reselect'
import { AppStateType } from "./redux-store";

export const selectProfile = (state: AppStateType) => state.profilePage.profile
export const selectAuthorizedUserId = (state: AppStateType) => state.auth.userId
export const selectStatus = (state: AppStateType) => state.profilePage.status
export const selectProfileUpdateStatus = (state: AppStateType) => state.profilePage.profileUpdateStatus
