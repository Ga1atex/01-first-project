import { ResultCodesEnum } from '../../../api/api';
import { usersAPI } from "../../../api/usersAPI";
import { UserType } from '../../../types/types';
import { BaseThunkType, InferActionTypes } from '../../store';

const TOGGLE_FOLLOW = 'social-network/usersPage/TOGGLE_FOLLOW';
const SET_USERS = 'social-network/usersPage/SET_USERS';
const SET_CURRENT_PAGE = 'social-network/usersPage/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT = 'social-network/usersPage/SET_TOTAL_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'social-network/usersPage/TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING_PROGRESS = 'social-network/usersPage/TOGGLE_IS_FOLLOWING_PROGRESS';
const SET_FILTER = 'social-network/usersPage/SET_FILTER';

const initialState = {
  usersData: [] as Array<UserType>,
  pageSize: 10,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>, // array of users ids
  filter: {
    term: '',
    friend: null as null | boolean
  }
};

export type FilterType = typeof initialState.filter
export type initialUserStateType = typeof initialState
type ActionsTypes = InferActionTypes<typeof actionCreators>

const usersReducer = (state = initialState, action: ActionsTypes): initialUserStateType => {
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
    case SET_FILTER: {
      const newState = {
        ...state,
        filter: action.payload
      };
      return newState;
    }
    default:
      return state;
  }
};
// Action Creators
export const actionCreators = {
  setUsers: (usersData: Array<UserType>) => {
    return {
      type: SET_USERS,
      usersData
    } as const
  },
  toggleFollowSuccess: (userId: number) => {
    return {
      type: TOGGLE_FOLLOW,
      userId,
    } as const
  },
  setCurrentPage: (currentPage: number) => {
    return {
      type: SET_CURRENT_PAGE,
      currentPage
    } as const
  },
  setTotalUsersCount: (totalUsersCount: number) => {
    return {
      type: SET_TOTAL_USERS_COUNT,
      count: totalUsersCount
    } as const
  },
  setFilter: (filter: FilterType) => {
    return {
      type: SET_FILTER,
      payload: filter
    } as const
  },
  toggleIsFetching: (isFetching: boolean) => {
    return {
      type: TOGGLE_IS_FETCHING,
      isFetching
    } as const
  },
  toggleFollowingProgress: (isFetching: boolean, userId: number) => {
    return {
      type: TOGGLE_IS_FOLLOWING_PROGRESS,
      isFetching,
      userId
    } as const
  }
}


type ThunkType = BaseThunkType<ActionsTypes>
// 2 ways to set a type, 2nd is "async (dispatch: DispatchType, getState: GetStateType)""
export const requestUsers = (pageNumber: number, pageSize: number, filter: FilterType): ThunkType => async (dispatch, getState) => {
  dispatch(actionCreators.toggleIsFetching(true));
  dispatch(actionCreators.setCurrentPage(pageNumber));
  dispatch(actionCreators.setFilter(filter));

  const data = await usersAPI.getUsers(pageNumber, pageSize, filter.term, filter.friend)
  dispatch(actionCreators.toggleIsFetching(false));
  dispatch(actionCreators.setUsers(data.items));
  dispatch(actionCreators.setTotalUsersCount(data.totalCount)); // should be replaced somewhere
};
export const toggleFollow = (followed: boolean, id: number): ThunkType => async (dispatch, getState) => {
  dispatch(actionCreators.toggleFollowingProgress(true, id));
  const data = await (followed
    ? usersAPI.unfollow(id)
    : usersAPI.follow(id));
  if (data.resultCode === ResultCodesEnum.Success) {
    dispatch(actionCreators.toggleFollowSuccess(id));
  }
  dispatch(actionCreators.toggleFollowingProgress(false, id));
};

export default usersReducer;
