import { FriendType } from "../types/types";

const initialState = {
  friendsData: [
    { id: 1, firstName: 'Andrew' },
    { id: 2, firstName: 'Sasha' },
    { id: 3, firstName: 'Sveta' },
  ] as Array<FriendType>
}
type InitialStateType = typeof initialState
const sidebarReducer = (state = initialState, action: any):InitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
}

export default sidebarReducer;
