import { AnyAction } from "redux";
import { FriendType } from "../../../types/types";

const initialState = {
  friendsData: [
    { id: 1, firstName: 'Andrew' },
    { id: 2, firstName: 'Sasha' },
    { id: 3, firstName: 'Sveta' },
  ] as Array<FriendType>
}
export type SidebarInitialStateType = typeof initialState

type ActionsTypes = AnyAction

const sidebarReducer = (state = initialState, action: ActionsTypes): SidebarInitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
}

export default sidebarReducer;
