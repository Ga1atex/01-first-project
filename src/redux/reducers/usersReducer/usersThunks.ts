import { ResultCodesEnum } from '../../../api/api';
import { usersAPI } from "../../../api/usersAPI";
import { BaseThunkType } from '../../store';
import { usersActionCreators } from './usersActions';
import { ActionsTypes, FilterType } from './usersReducer';

type ThunkType = BaseThunkType<ActionsTypes>;
// 2 ways to set a type, 2nd is "async (dispatch: DispatchType, getState: GetStateType)""
export const requestUsers = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
  dispatch(usersActionCreators.toggleIsFetching(true));
  dispatch(usersActionCreators.setCurrentPage(pageNumber));
  dispatch(usersActionCreators.setFilter(filter));

  const data = await usersAPI.getUsers(pageNumber, pageSize, filter.term, filter.friend);
  dispatch(usersActionCreators.toggleIsFetching(false));
  dispatch(usersActionCreators.setUsers(data.items));
  dispatch(usersActionCreators.setTotalUsersCount(data.totalCount)); // should be replaced somewhere
};
export const toggleFollow = (followed: boolean, id: number): ThunkType => async (dispatch, getState) => {
  dispatch(usersActionCreators.toggleFollowingProgress(true, id));
  const data = await (followed
    ? usersAPI.unfollow(id)
    : usersAPI.follow(id));
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(usersActionCreators.toggleFollowSuccess(id));
  }
  dispatch(usersActionCreators.toggleFollowingProgress(false, id));
};
