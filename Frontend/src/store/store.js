// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import pathReducer from "./pathSlice";

export const store = configureStore({
  reducer: {
    path: pathReducer,
  },
});
