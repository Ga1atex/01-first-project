import { usersAPI } from '../api/api';
import { PhotosType, UserType } from '../types/types';

const TOGGLE_FOLLOW = 'social-network/usersPage/TOGGLE_FOLLOW';
const SET_USERS = 'social-network/usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/usersPage/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/usersPage/TOGGLE_IS_FOLLOWING_PROGRESS';

const initialState = {
  usersData: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number> // array of users ids
};

type initialStateType = typeof initialState

const usersReducer = (state = initialState, action: any):initialStateType => {
  switch (action.type) {
    case TOGGLE_FOLLOW: {
      const newState = {
        ...state,
        usersData: state.usersData.map((user: UserType) => {
          if (user.id === action.userId) {
            return { ...user, followed: !user.followed };
          }
          return user;
        })
      };
      return newState;
    }
    case SET_CURRENT_PAGE: {
      const newState = {
        ...state,
        currentPage: action.currentPage
      };
      return newState;
    }
    case SET_TOTAL_USERS_COUNT: {
      const newState = {
        ...state,
        totalUsersCount: action.count
      };
      return newState;
    }
    case TOGGLE_IS_FETCHING: {
      const newState = {
        ...state,
        isFetching: action.isFetching
      };
      return newState;
    }
    case TOGGLE_IS_FOLLOWING_PROGRESS: {
      const newState = {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter(id => id !== action.userId)
      };
      return newState;
    }
    case SET_USERS: {
      const newState = {
        ...state,
        usersData: [...action.usersData]
      };
      return newState;
    }
    default:
      return state;
  }
};
type SetUsersActionType = {
  type: typeof SET_USERS
  usersData: Array<UserType>
}
// Action Creators
export const setUsers = (usersData: Array<UserType>):SetUsersActionType => {
  return {
    type: SET_USERS,
    usersData
  };
};
type ToggleFollowSuccessActionType = {
  type: typeof TOGGLE_FOLLOW
  userId: number
}
export const toggleFollowSuccess = (userId: number):ToggleFollowSuccessActionType => {
  return {
    type: TOGGLE_FOLLOW,
    userId,
  };
};
type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE
  currentPage: number
}
export const setCurrentPage = (currentPage: number):SetCurrentPageActionType => {
  return {
    type: SET_CURRENT_PAGE,
    currentPage
  };
};
type SetTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT
  count: number
}
export const setTotalUsersCount = (totalUsersCount: number):SetTotalUsersCountActionType => {
  return {
    type: SET_TOTAL_USERS_COUNT,
    count: totalUsersCount
  };
};
type ToggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING
  isFetching: boolean
}
export const toggleIsFetching = (isFetching: boolean):ToggleIsFetchingActionType => {
  return {
    type: TOGGLE_IS_FETCHING,
    isFetching
  };
};
type ToggleFollowingProgressActionType = {
  type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
  isFetching: boolean
  userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number):ToggleFollowingProgressActionType => {
  return {
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
  };
};

export const requestUsers = (pageNumber: number, pageSize: number) => async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(pageNumber));

    const data = await usersAPI.getUsers(pageNumber, pageSize)
        dispatch(toggleIsFetching(false));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount)); // should be replaced somewhere
  };
export const toggleFollow = (followed: boolean, id: number) => async (dispatch: any) => {
  dispatch(toggleFollowingProgress(true, id));
  const data = await (followed ?
    usersAPI.unfollow(id)
    : usersAPI.follow(id));
  if (data.resultCode === 0) {
    dispatch(toggleFollowSuccess(id));
  }
  dispatch(toggleFollowingProgress(false, id));
};

export default usersReducer;
