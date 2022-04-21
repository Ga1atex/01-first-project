import { AppStateType } from "../../store";


export const selectInitialized = (state: AppStateType) => state.app.initialized
