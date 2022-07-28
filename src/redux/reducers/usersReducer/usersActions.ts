import { UserType } from "../../../types/types";
import { FilterType } from "./usersReducer";

// export enum usersActions {
//   TOGGLE_FOLLOW = 'usersPage/TOGGLE_FOLLOW',
//   SET_USERS = 'usersPage/SET_USERS',
//   SET_CURRENT_PAGE = 'usersPage/SET_CURRENT_PAGE',
//   SET_TOTAL_USERS_COUNT = 'usersPage/SET_TOTAL_USERS_COUNT',
//   TOGGLE_IS_FETCHING = 'usersPage/TOGGLE_IS_FETCHING',
//   TOGGLE_IS_FOLLOWING_PROGRESS = 'usersPage/TOGGLE_IS_FOLLOWING_PROGRESS',
//   SET_FILTER = 'usersPage/SET_FILTER'
// }

// export const usersActionCreators = {
//   setUsers: (usersData: Array<UserType>) => {
//     return {
//       type: usersActions.SET_USERS,
//       usersData
//     } as const;
//   },
//   toggleFollowSuccess: (userId: number) => {
//     return {
//       type: usersActions.TOGGLE_FOLLOW,
//       userId,
//     } as const;
//   },
//   setCurrentPage: (currentPage: number) => {
//     return {
//       type: usersActions.SET_CURRENT_PAGE,
//       currentPage
//     } as const;
//   },
//   setTotalUsersCount: (totalUsersCount: number) => {
//     return {
//       type: usersActions.SET_TOTAL_USERS_COUNT,
//       count: totalUsersCount
//     } as const;
//   },
//   setFilter: (filter: FilterType) => {
//     return {
//       type: usersActions.SET_FILTER,
//       payload: filter
//     } as const;
//   },
//   toggleIsFetching: (isFetching: boolean) => {
//     return {
//       type: usersActions.TOGGLE_IS_FETCHING,
//       isFetching
//     } as const;
//   },
//   toggleFollowingProgress: (isFetching: boolean, userId: number) => {
//     return {
//       type: usersActions.TOGGLE_IS_FOLLOWING_PROGRESS,
//       isFetching,
//       userId
//     } as const;
//   }
// };
