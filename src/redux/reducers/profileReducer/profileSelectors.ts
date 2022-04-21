// import { createSelector } from 'reselect'
import { AppStateType } from "../../store";

export const selectProfile = (state: AppStateType) => state.profilePage.profile
export const selectAuthorizedUserId = (state: AppStateType) => state.auth.userId
export const selectStatus = (state: AppStateType) => state.profilePage.status
export const selectProfileUpdateStatus = (state: AppStateType) => state.profilePage.profileUpdateStatus
export const selectPostsData = (state: AppStateType) => state.profilePage.postsData
export const selectProfileIsFetching = (state: AppStateType) => state.profilePage.isFetching
