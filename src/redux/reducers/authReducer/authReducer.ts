import { createSlice } from "@reduxjs/toolkit";
// import { InferActionTypes } from "../../store";
// import { authActions, authActionCreators } from './authActions';
import { getAuthUserData, getCaptchaUrl, logout } from "./authThunks";

const authInitialState = {
  userId: null as null | number,
  email: null as null | string,
  login: null as null | string,
  fullName: null as null | string,
  photoSmall: null as null | string,
  isAuth: false,
  captchaUrl: null as null | string, // if null, then captcha is not required
};

export type AuthInitialStateType = typeof authInitialState;

// const authReducer = (state = authInitialState, action: ActionsTypes): AuthInitialStateType => {
//   switch (action.type) {
//     case authActions.SET_USER_DATA: {
//       return {
//         ...state,
//         ...action.payload
//       };
//     }
//     case authActions.GET_CAPTCHA_URL_SUCCESS: {
//       return {
//         ...state,
//         captchaUrl: action.captchaUrl
//       };
//     }
//     default:
//       return state;
//   }
// };

export const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    setAuthUserData(state, action) {
      state = action.payload;
    },
  },
  extraReducers(builder) {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(getAuthUserData.fulfilled, (state, action) => {
        state.userId = action.payload!.userId;
        state.email = action.payload!.email;
        state.fullName = action.payload!.fullName;
        state.login = action.payload!.login;
        state.photoSmall = action.payload!.photoSmall;
        state.isAuth = action.payload!.isAuth;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.userId = null;
        state.email = null;
        state.fullName = null;
        state.login = null;
        state.photoSmall = null;
        state.isAuth = false;
      })
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        state.captchaUrl = action.payload;
      });
  },
});

// export type ActionsTypes = InferActionTypes<typeof authActionCreators>

export default authSlice.reducer;
