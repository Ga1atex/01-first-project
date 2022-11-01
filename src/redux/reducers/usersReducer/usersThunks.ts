import { createAsyncThunk } from '@reduxjs/toolkit';
import { ResultCodesEnum } from '../../../api/api';
import { usersAPI } from '../../../api/usersAPI';
import { FilterType } from '../../../types/types';
import { usersActionCreators } from './usersReducer';

export const requestUsers = createAsyncThunk(
  'users/requestUsers',
  async (
    {
      pageNumber,
      pageSize,
      filter,
    }: { pageNumber: number; pageSize: number; filter: FilterType },
    thunkAPI
  ) => {
    thunkAPI.dispatch(usersActionCreators.setCurrentPage(pageNumber));
    thunkAPI.dispatch(usersActionCreators.setFilter(filter));

    const response = await usersAPI.getUsers(
      pageNumber,
      pageSize,
      filter.term,
      filter.friend
    );
    return {
      users: response.items,
      totalCount: response.totalCount,
    };
  }
);

export const toggleFollow = createAsyncThunk(
  'users/toggleFollow',
  async (
    { followed, userId }: { followed: boolean; userId: number },
    thunkAPI
  ) => {
    thunkAPI.dispatch(
      usersActionCreators.toggleFollowingProgress({
        isFetching: true,
        userId,
      })
    );
    try {
      const response = await (followed
        ? usersAPI.unfollow(userId)
        : usersAPI.follow(userId));
      if (response.resultCode === ResultCodesEnum.Success) {
        return userId;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue((error as Error).message);
    } finally {
      thunkAPI.dispatch(
        usersActionCreators.toggleFollowingProgress({
          isFetching: false,
          userId,
        })
      );
    }
  }
);
