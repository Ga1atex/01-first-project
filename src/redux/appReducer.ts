import { getAuthUserData } from './authReducer';

const INITIALIZED_SUCCESS = 'social-network/app/INITIALIZED_SUCCESS';

export type InitialStateType = {
  initialized: boolean
}

let initialState: InitialStateType = {
  initialized: false
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type initialStateTypeActionType = {
  type: typeof INITIALIZED_SUCCESS
}

export const initializedSuccess = ():initialStateTypeActionType => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => async (dispatch: Function) => {
  await dispatch(getAuthUserData());
  dispatch(initializedSuccess());
};


export default appReducer;
