import { RootState } from "./../index";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { LoginOutput } from "../../api/auth";

export interface AuthInfo {
  email: string;
  username: string;
  accessToken: string;
  isLoggedIn: boolean;
  role: string | null;
}

export const initialState: AuthInfo = {
  email: "",
  username: "",
  accessToken: "",
  isLoggedIn: false,
  role: null,
};

const authSlice: Slice<AuthInfo> = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ data: LoginOutput }>) {
      const {
        userDto: { username, email, role },
        accesstoken,
      } = action.payload.data;

      return {
        email,
        username,
        role,
        accessToken: accesstoken,
        isLoggedIn: true,
      };
    },
    logout(state) {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn;
export const accessTokenSelector = (state: RootState) => state.auth.accessToken;
