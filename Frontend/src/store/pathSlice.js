// src/redux/pathSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPath: "/",
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setCurrentPath: (state, action) => {
      state.currentPath = action.payload;
    },
  },
});

export const { setCurrentPath } = pathSlice.actions;
export default pathSlice.reducer;
