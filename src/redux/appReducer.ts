import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { getAuthUserData } from './authReducer';
import { AppStateType } from './redux-store';

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false
};

type ActionsTypes = InitialStateTypeActionType

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };

    default:
      return state;
  }
};

type InitialStateTypeActionType = {
  type: typeof INITIALIZED_SUCCESS
}
export const initializedSuccess = ():InitialStateTypeActionType => ({ type: INITIALIZED_SUCCESS });

type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccess());
};


export default appReducer;
