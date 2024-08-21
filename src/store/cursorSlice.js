import { createSlice, createSelector } from "@reduxjs/toolkit";
import generateRandomClipPath from "../utils/generateRandomClipPath";

const initialState = {
  positionStyle: {
    top: "0%",
    left: "0%",
    width: "0%",
    height: "0%",
  },
  clipPathStyle: {
    clipPath: generateRandomClipPath(),
  },
};

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    changeLocation: (state, { payload }) => {
      const { top = "0%", left = "0%", width = "0%", height = "0%" } = payload;
      const newPositionStyle = {
        top: `${top}%`,
        left: `${left}%`,
        width: `${width}%`,
        height: `${height}%`,
      };

      const newClipPathStyle = {
        clipPath: generateRandomClipPath(),
      };

      state.positionStyle = newPositionStyle;
      state.clipPathStyle = newClipPathStyle;
    },
  },
});

const selectSelf = (state) => state.cursorReducer;
export const cursorSelector = createSelector(selectSelf, (state) => state);

export const { changeLocation } = cursorSlice.actions;
export default cursorSlice.reducer;
