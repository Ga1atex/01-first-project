import { Action, applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunkMiddleware, { ThunkAction } from 'redux-thunk';
import appReducer from './appReducer';
import authReducer from './authReducer';
import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';



const rootReducer = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer,
})

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>
// const store = createStore(reducers, applyMiddleware(thunkMiddleware));

// type PropertiesTypes<T> = T extends { [key: string]: infer U } ? U : never
// export type InferActionTypes<T extends { [key: string]: (...args: Array<any>)=>any }> = ReturnType<PropertiesTypes<T>>

export type InferActionTypes<T> = T extends { [keys: string]: (...args: Array<any>) => infer U} ? U : never

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>




// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunkMiddleware)
  ));
// @ts-ignore
window.__store__ = store

export default store;
