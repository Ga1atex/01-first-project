import { getAuthUserData } from '../authReducer/authReducer';
import { BaseThunkType, InferActionTypes } from '../../store';

const INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS';

let initialState = {
  initialized: false
};

export type InitialStateType = typeof initialState

type ActionsTypes = InferActionTypes<typeof actionCreators>

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

export const actionCreators = {
  initializedSuccess: () => ({ type: INITIALIZED_SUCCESS } as const)
}

type ThunkType = BaseThunkType<ActionsTypes>

export const initializeApp = (): ThunkType => async (dispatch) => {
  await dispatch(getAuthUserData());
  dispatch(actionCreators.initializedSuccess());
};


export default appReducer;
