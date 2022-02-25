import usersReducer, { actionCreators, initialUserStateType } from './usersReducer';

let state: initialUserStateType

beforeEach(() => {
  state = {
    usersData: [
      { id: 0, name: 'Name0', followed: false, photos: { small: null, large: null }, status: 'status 0' },
      { id: 1, name: 'Name1', followed: false, photos: { small: null, large: null }, status: 'status 1' },
      { id: 2, name: 'Name2', followed: true, photos: { small: null, large: null }, status: 'status 2' },
      { id: 3, name: 'Name3', followed: true, photos: { small: null, large: null }, status: 'status 3' }
    ],
    pageSize: 10,
    totalUsersCount: 0,
    currentPage: 1,
    isFetching: false,
    followingInProgress: []
  };
})

describe('user reducer action tests', () => {
  test('toggle follow works', () => {


    const newState = usersReducer(state, actionCreators.toggleFollowSuccess(1))

    expect(newState.usersData[0].followed).toBeFalsy();
    expect(newState.usersData[1].followed).toBeTruthy();
  })
})
