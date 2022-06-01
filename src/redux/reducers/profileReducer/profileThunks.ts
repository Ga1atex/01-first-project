import { message } from 'antd';
import { RcFile } from 'antd/lib/upload/interface';
import { ResultCodesEnum } from '../../../api/api';
import { profileAPI } from "../../../api/profileAPI";
import { ProfileType } from '../../../types/types';
import { BaseThunkType } from '../../store';
import { profileActionCreators } from './profileActions';
import { ProfileActionsType } from './profileReducer';

type ThunkType = BaseThunkType<ProfileActionsType>;
//Thunk Creators

export const getUserProfile = (userId: null | number): ThunkType => async (dispatch) => {
  dispatch(profileActionCreators.getUserProfile());
  const data = await profileAPI.getProfile(userId);
  dispatch(profileActionCreators.setUserProfile(data));
};
export const getProfileStatus = (userId: number): ThunkType => async (dispatch) => {
  const data = await profileAPI.getProfileStatus(userId);

  dispatch(profileActionCreators.setProfileStatus(data));
};
export const updateProfileStatus = (status: string): ThunkType => async (dispatch) => {
  const data = await profileAPI.updateProfileStatus(status);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(profileActionCreators.setProfileStatus(status));
  }
};
export const savePhoto = (file: string | Blob | RcFile): ThunkType => async (dispatch) => {
  // export const savePhoto = (file: UploadFile<unknown>): ThunkType => async (dispatch) => {
  // export const savePhoto = (file: File): ThunkType => async (dispatch) => {
  const data = await profileAPI.savePhoto(file);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(profileActionCreators.savePhotoSuccess(data.data.photos));
  } else if (data.resultCode === ResultCodesEnum.Error) {
    const errorMessage = data.messages.length ? data.messages[0] : 'Image download fail';
    message.error(errorMessage);
  }
};
export const saveProfile = (profile: ProfileType, setErrors: Function): ThunkType => async (dispatch, getState) => {
  const data = await profileAPI.saveProfile(profile);

  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(profileActionCreators.saveProfileSuccess('success'));
    dispatch(getUserProfile(getState().auth.userId));
  } else if (data.resultCode === ResultCodesEnum.Error) {
    // const errorMessages = data.messages.length ? data.messages[0] : 'Wrong link';
    // (obj: { [key: string]: any}
    const errorMessages = data.messages.reduce((obj: Record<string, any>, item: string) => {
      const errorInputs = item.match(/(.*)\((\w+)->(\w+)\)/i);
      if (errorInputs && errorInputs.length) {
        const [errorMessage, errorGroup, errorInput] = [errorInputs[1].trim(), errorInputs[2].toLowerCase(), errorInputs[3].toLowerCase()];

        if (obj[errorGroup]) {
          obj[errorGroup][errorInput] = errorMessage;
        } else {
          obj[errorGroup] = {
            [errorInput]: errorMessage
          };
        }
      }

      return obj;
    }, {});

    dispatch(profileActionCreators.saveProfileSuccess('error'));
    // setStatus({errors: errorMessages})
    setErrors(errorMessages);
  }
};
