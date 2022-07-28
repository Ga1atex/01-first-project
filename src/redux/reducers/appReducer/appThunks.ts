import { getAuthUserData } from "../authReducer/authThunks";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const initializeApp = createAsyncThunk(
  "app/initializeApp",
  async (_, thunkAPI) => {
    try {
      await thunkAPI.dispatch(getAuthUserData());
    } catch (e) {
      return thunkAPI.rejectWithValue((e as Error).message);
    }
  }
);
