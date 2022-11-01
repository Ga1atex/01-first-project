// import { createSelector } from 'reselect'
import { AppStateType } from '../../store';

export const selectUsers = (state: AppStateType) => state.usersPage.usersData;
export const selectPageSize = (state: AppStateType) => state.usersPage.pageSize;
export const selectTotalUsersCount = (state: AppStateType) =>
  state.usersPage.totalUsersCount;
export const selectCurrentPage = (state: AppStateType) =>
  state.usersPage.currentPage;
export const selectIsFetching = (state: AppStateType) =>
  state.usersPage.isFetching;
export const selectFollowingInProgress = (state: AppStateType) =>
  state.usersPage.followingInProgress;
export const selectUsersFilter = (state: AppStateType) =>
  state.usersPage.filter;
