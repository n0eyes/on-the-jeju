import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import auth from "./auth";
import { initialState } from "./auth";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
interface RootState {
  auth: typeof initialState;
}

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = (
  state: RootState,
  action: AnyAction
): CombinedState<RootState> => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({ auth })(state, action);
};

export default persistReducer(persistConfig, rootReducer);
