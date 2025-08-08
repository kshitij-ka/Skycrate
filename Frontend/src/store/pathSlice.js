// src/redux/pathSlice.js
import { createSlice } from "@reduxjs/toolkit";

const getInitialPath = () => {
  const username = localStorage.getItem("username");
  return username ? `/${username}` : "/";
};

const initialState = {
  currentPath: getInitialPath(),
};

const pathSlice = createSlice({
  name: "path",
  initialState,
  reducers: {
    setCurrentPath: (state, action) => {
      console.log("Redux: Setting current path to:", action.payload);
      state.currentPath = action.payload;
    },
    resetToUserRoot: (state) => {
      const username = localStorage.getItem("username");
      const userRoot = username ? `/${username}` : "/";
      console.log("Redux: Resetting to user root:", userRoot);
      state.currentPath = userRoot;
    },
  },
});

export const { setCurrentPath, resetToUserRoot } = pathSlice.actions;
export default pathSlice.reducer;
