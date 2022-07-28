import { createSlice } from "@reduxjs/toolkit";
import { InferActionTypes } from "../../store";
// import { appActionCreators, appActions } from './appActions';
import { initializeApp } from "./appThunks";

export const appInitialState = {
  initialized: false,
  error: "",
};
export type AppInitialStateType = typeof appInitialState;

// export type ActionsTypes = InferActionTypes<typeof appActionCreators>

export const appSlice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {},
  extraReducers: {
    [initializeApp.fulfilled.type]: (state, action) => {
      state.initialized = true;
    },
    [initializeApp.rejected.type]: (state, action) => {
      state.initialized = true;
      state.error = action.payload;
    },
  },
});

export default appSlice.reducer;
