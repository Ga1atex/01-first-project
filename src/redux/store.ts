import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from './reducers/appReducer/appReducer';
import authReducer from './reducers/authReducer/authReducer';
import chatReducer from './reducers/chatReducer/chatReducer';
import dialogsReducer from './reducers/dialogsReducer/dialogsReducer';
import profileReducer from './reducers/profileReducer/profileReducer';
import sidebarReducer from './reducers/sidebarReducer/sidebarReducer';
import usersReducer from './reducers/usersReducer/usersReducer';
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension';

const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
  chat: chatReducer,
})

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__  || compose;
const store = createStore(rootReducer, composeWithDevToolsDevelopmentOnly(
  applyMiddleware(thunkMiddleware)
));

export default store;

export type AppStateType = ReturnType<typeof rootReducer>
export type InferActionTypes<T> = T extends { [keys: string]: (...args: Array<any>) => infer U } ? U : never
export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
