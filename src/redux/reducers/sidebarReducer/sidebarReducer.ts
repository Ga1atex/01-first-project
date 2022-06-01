import { AnyAction } from "redux";
import { UserType } from "../../../types/types";

// enum sidebarActions { }

const sidebarInitialState = {
  friendsData: [] as Array<UserType>
}
export type SidebarInitialStateType = typeof sidebarInitialState

type ActionsTypes = AnyAction

const sidebarReducer = (state = sidebarInitialState, action: ActionsTypes): SidebarInitialStateType => {
  switch (action.type) {
    default:
      return state;
  }
}

// const sidebarActionCreators = {}

export default sidebarReducer;
