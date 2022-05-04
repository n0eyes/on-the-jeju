import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";

export interface AuthInfo {
  id: string;
  name: string;
  accessToken: string;
  isLoggedIn: boolean;
}

export const initialState: AuthInfo = {
  id: "",
  name: "",
  accessToken: "",
  isLoggedIn: false,
};

const authSlice: Slice<AuthInfo> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      reducer: (state, action: PayloadAction) => {
        return action.payload;
      },
      prepare: (payload) => {
        return { payload: { ...payload, isLoggedIn: true } };
      },
    },
    logout(state) {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
