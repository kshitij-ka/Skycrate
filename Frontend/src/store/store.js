// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import pathReducer from "./pathSlice";
import setIsUploadingReducer from "./UploadStatusSlice";

export const store = configureStore({
  reducer: {
    path: pathReducer,
    upload: setIsUploadingReducer,
  },
});
