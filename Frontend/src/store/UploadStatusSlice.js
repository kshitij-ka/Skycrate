import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUploading: false,
};

const uploadStatusSlice = createSlice({
  name: "uploadStatus",
  initialState,
  reducers: {
    setIsUploading: (state) => {
      state.isUploading = !state.isUploading;
    },
  },
});

export const { setIsUploading } = uploadStatusSlice.actions;
export default uploadStatusSlice.reducer;
