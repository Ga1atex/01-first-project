import { APIResponseType, ResultCodesEnum } from '../../../api/api';
import { usersAPI } from '../../../api/usersAPI';
import { usersActionCreators } from './usersReducer';
import { toggleFollow } from './usersThunks';

jest.mock('../../../api/usersAPI');
const usersAPIMock = usersAPI as jest.Mocked<typeof usersAPI>;

const APIResponse: APIResponseType = {
  resultCode: ResultCodesEnum.Success,
  messages: [],
  data: {},
};

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
  dispatchMock.mockClear();
  getStateMock.mockClear();
  usersAPIMock.follow.mockClear();
  usersAPIMock.unfollow.mockClear();
});

describe('user reducer thunk tests', () => {
  test('toggle follow thunk works2', async () => {
    usersAPIMock.unfollow.mockResolvedValue(APIResponse);
    const thunk = toggleFollow({ followed: true, userId: 1 });

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      usersActionCreators.toggleFollowingProgress({
        isFetching: true,
        userId: 1,
      })
    );
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      usersActionCreators.toggleFollowingProgress({
        isFetching: false,
        userId: 1,
      })
    );
  });
  test('success unfollow toggleFollow thunk', async () => {
    usersAPIMock.follow.mockResolvedValue(APIResponse);

    const thunk = toggleFollow({ followed: false, userId: 1 });

    await thunk(dispatchMock, getStateMock, {});

    expect(dispatchMock).toBeCalledTimes(4);
    expect(dispatchMock).toHaveBeenNthCalledWith(
      1,
      usersActionCreators.toggleFollowingProgress({
        isFetching: true,
        userId: 1,
      })
    );
    // expect(dispatchMock).toHaveBeenNthCalledWith(2, usersActionCreators.toggleFollowSuccess(1));
    expect(dispatchMock).toHaveBeenNthCalledWith(
      3,
      usersActionCreators.toggleFollowingProgress({
        isFetching: false,
        userId: 1,
      })
    );
  });
});
