import { createSlice } from "@reduxjs/toolkit";
import { UserType } from "../../../types/types";
import { requestUsers, toggleFollow } from "./usersThunks";

const usersInitialState = {
  usersData: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
  filter: {
    term: "",
    friend: null as null | boolean,
  },
};

export type FilterType = typeof usersInitialState.filter;
export type initialUserStateType = typeof usersInitialState;
// export type ActionsTypes = InferActionTypes<typeof usersActionCreators>;

// const usersReducer = (
//   state = usersInitialState,
//   action: ActionsTypes
// ): initialUserStateType => {
//   switch (action.type) {
//     case usersActions.TOGGLE_FOLLOW: {
//       return {
//         ...state,
//         usersData: state.usersData.map((user: UserType) => {
//           if (user.id === action.userId) {
//             return { ...user, followed: !user.followed };
//           }
//           return user;
//         }),
//       };
//     }
//     case usersActions.SET_CURRENT_PAGE: {
//       return {
//         ...state,
//         currentPage: action.currentPage,
//       };
//     }
//     case usersActions.SET_TOTAL_USERS_COUNT: {
//       return {
//         ...state,
//         totalUsersCount: action.count,
//       };
//     }
//     case usersActions.TOGGLE_IS_FETCHING: {
//       return {
//         ...state,
//         isFetching: action.isFetching,
//       };
//     }
//     case usersActions.TOGGLE_IS_FOLLOWING_PROGRESS: {
//       return {
//         ...state,
//         followingInProgress: action.isFetching
//           ? [...state.followingInProgress, action.userId]
//           : state.followingInProgress.filter((id) => id !== action.userId),
//       };
//     }
//     case usersActions.SET_USERS: {
//       return {
//         ...state,
//         usersData: [...action.usersData],
//       };
//     }
//     case usersActions.SET_FILTER: {
//       return {
//         ...state,
//         filter: action.payload,
//       };
//     }
//     default:
//       return state;
//   }
// };

export const usersSlice = createSlice({
  name: "users",
  initialState: usersInitialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    toggleFollowingProgress(state, action) {
      action.payload.isFetching
        ? state.followingInProgress.push(action.payload.userId)
        : (state.followingInProgress = state.followingInProgress.filter(
            (id) => id !== action.payload.userId
          ));
    },
  },
  extraReducers(builder) {
    builder
      .addCase(requestUsers.pending, (state, action) => {
        state.isFetching = true;
      })
      .addCase(requestUsers.fulfilled, (state, action) => {
        state.isFetching = false;
        state.usersData = action.payload.users;
        state.totalUsersCount = action.payload.totalCount;
      })
      // .addCase(toggleFollow.pending, (state, action) => {
      //   state.followingInProgress.push(action.meta.arg.userId);
      // })
      .addCase(toggleFollow.fulfilled, (state, action) => {
        state.usersData = state.usersData.map((user: UserType) => {
          if (user.id === action.payload) {
            return { ...user, followed: !user.followed };
          }

          return user;
        });
        // state.followingInProgress = state.followingInProgress.filter(
        //   (id) => id !== action.payload
        // );
      });
  },
});

export const usersActionCreators = usersSlice.actions;
export default usersSlice.reducer;
