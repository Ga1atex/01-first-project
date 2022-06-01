import { getAuthUserData } from "../authReducer/authThunks";
import { BaseThunkType } from '../../store';
import { appActionCreators } from './appActions';
import { ActionsTypes } from './appReducer';

type ThunkType = BaseThunkType<ActionsTypes>;

export const initializeApp = (): ThunkType => async (dispatch) => {
  try {
    await dispatch(getAuthUserData());
    dispatch(appActionCreators.initializedSuccess());
  } catch (e) {
    dispatch(appActionCreators.initializedFail((e as Error).message));
  }
};
