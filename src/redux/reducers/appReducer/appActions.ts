export enum appActions {
  INITIALIZED_SUCCESS = 'app/INITIALIZED_SUCCESS',
  INITIALIZED_FAILED = 'app/INITIALIZED_FAILED',
}

export const appActionCreators = {
  initializedSuccess: () => ({
    type: appActions.INITIALIZED_SUCCESS
  } as const),
  initializedFail: (errorMessage: string) => ({
    type: appActions.INITIALIZED_FAILED,
    payload: errorMessage
  } as const)
};
