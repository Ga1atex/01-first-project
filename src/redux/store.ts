import { configureStore } from "@reduxjs/toolkit";
import { Action, combineReducers } from "redux";
import { ThunkAction } from "redux-thunk";
import appReducer from "./reducers/appReducer/appReducer";
import authReducer from "./reducers/authReducer/authReducer";
import chatReducer from "./reducers/chatReducer/chatReducer";
import dialogsReducer from "./reducers/dialogsReducer/dialogsReducer";
import profileReducer from "./reducers/profileReducer/profileReducer";
import usersReducer from "./reducers/usersReducer/usersReducer";

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
});

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;
// const store = createStore(rootReducer, composeWithDevToolsDevelopmentOnly(
//   applyMiddleware(thunkMiddleware)
// ));

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppStateType = ReturnType<typeof rootReducer>;
export type InferActionTypes<T> = T extends {
  [keys: string]: (...args: Array<any>) => infer U;
}
  ? U
  : never;
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
  R,
  AppStateType,
  unknown,
  A
>;
