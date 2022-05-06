import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import auth from "./auth";
import { initialState } from "./auth";

interface RootState {
  auth: typeof initialState;
}

const rootReducer = (
  state: RootState,
  action: AnyAction
): CombinedState<RootState> => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({ auth })(state, action);
};

export default rootReducer;
