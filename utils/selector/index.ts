import { RootState } from "./../../store/modules/index";

export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
