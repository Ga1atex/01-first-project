import { InferActionTypes } from '../../store';
import { appActionCreators, appActions } from './appActions';

export const appInitialState = {
  initialized: false,
  error: ''
};
export type AppInitialStateType = typeof appInitialState

export type ActionsTypes = InferActionTypes<typeof appActionCreators>

const appReducer = (state = appInitialState, action: ActionsTypes): AppInitialStateType => {
  switch (action.type) {
    case appActions.INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true
      };
    case appActions.INITIALIZED_FAILED:
      return {
        ...state,
        initialized: true,
        error: action.payload
      };
    default:
      return state;
  }
};


export default appReducer;
