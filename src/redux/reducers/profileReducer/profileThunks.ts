import { createAsyncThunk } from '@reduxjs/toolkit';
import { RcFile } from 'antd/lib/upload/interface';
import { ResultCodesEnum } from '../../../api/api';
import { profileAPI } from '../../../api/profileAPI';
import { ProfileType } from '../../../types/types';
import { parseContactsLinkErrors } from '../../../utils/helpers/parseContactsLinkErrors';
import { profileActionCreators } from './profileReducer';

// type ThunkType = BaseThunkType<ProfileActionsType>;

export const getUserProfile = createAsyncThunk(
  'auth/getUserProfile',
  async (userId: null | number, thunkAPI) => {
    const response = await profileAPI.getProfile(userId);

    return response;
  }
);

export const getProfileStatus = createAsyncThunk(
  'auth/getProfileStatus',
  async (userId: number, thunkAPI) => {
    const response = await profileAPI.getProfileStatus(userId);

    return response;
  }
);

export const updateProfileStatus = createAsyncThunk(
  'auth/updateProfileStatus',
  async (status: string, thunkAPI) => {
    const data = await profileAPI.updateProfileStatus(status);

    if (data.resultCode === ResultCodesEnum.Success) {
      return status;
    }
    return thunkAPI.rejectWithValue('Failed to update status');
  }
);

export const savePhoto = createAsyncThunk(
  'auth/savePhoto',
  async (file: string | Blob | RcFile, thunkAPI) => {
    const response = await profileAPI.savePhoto(file);

    if (response.resultCode === ResultCodesEnum.Success) {
      return response.data.photos;
    } else if (response.resultCode === ResultCodesEnum.Error) {
      const errorMessage = response.messages.length
        ? response.messages[0]
        : 'Image download fail';
      return thunkAPI.rejectWithValue(errorMessage);
    }

    return thunkAPI.rejectWithValue('Failed to save photo');
  }
);

export const saveProfile = createAsyncThunk(
  'auth/saveProfile',
  async (
    { profile, setErrors }: { profile: ProfileType; setErrors: Function },
    thunkAPI
  ) => {
    const response = await profileAPI.saveProfile(profile);

    if (response.resultCode === ResultCodesEnum.Success) {
      thunkAPI.dispatch(
        profileActionCreators.setProfileUpdateStatus('success')
      );

      return profile;
    } else if (response.resultCode === ResultCodesEnum.Error) {
      const errorMessages = parseContactsLinkErrors(response.messages);

      thunkAPI.dispatch(profileActionCreators.setProfileUpdateStatus('error'));

      setErrors(errorMessages);
      return thunkAPI.rejectWithValue(errorMessages);
    }
    return thunkAPI.rejectWithValue('Failed to save profile');
  }
);
