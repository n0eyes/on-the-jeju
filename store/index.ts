import { configureStore, Store } from "@reduxjs/toolkit";
import { Context, createWrapper, MakeStore } from "next-redux-wrapper";

import rootReducer from "./modules";

const makeStore: MakeStore<Store> = (context: Context) =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== "production",
  });

export const wrapper = createWrapper<Store>(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof rootReducer>;
