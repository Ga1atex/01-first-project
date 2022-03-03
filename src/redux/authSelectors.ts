// import { createSelector } from 'reselect'
import { AppStateType } from "./redux-store";

export const selectIsAuth = (state:AppStateType) => state.auth.isAuth
export const selectCurrentUserLogin = (state: AppStateType) => state.auth.login
export const selectFullName = (state: AppStateType) => state.auth.fullName
export const selectPhotoSmall = (state: AppStateType) => state.auth.photoSmall
