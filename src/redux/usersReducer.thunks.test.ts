import { APIResponseType, ResultCodesEnum } from '../api/api';
import { usersAPI } from '../api/usersAPI';
import { actionCreators, toggleFollow } from './usersReducer';

jest.mock('../api/usersAPI')
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const APIResponse: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {}
}

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.follow.mockClear();
  usersAPIMock.unfollow.mockClear();
})

describe('user reducer thunk tests', () => {
  test('toggle follow thunk works2', async () => {
    usersAPIMock.unfollow.mockResolvedValue(APIResponse)
    const thunk = toggleFollow(true, 1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.toggleFollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.toggleFollowingProgress(false, 1));
  })
  test('success unfollow toggleFollow thunk', async () => {
    usersAPIMock.follow.mockResolvedValue(APIResponse)

    const thunk = toggleFollow(false,1)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actionCreators.toggleFollowingProgress(true, 1));
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actionCreators.toggleFollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actionCreators.toggleFollowingProgress(false, 1));
  })
})
