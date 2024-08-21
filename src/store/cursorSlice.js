import { createSlice, createSelector } from "@reduxjs/toolkit";
import generateRandomClipPath from "../utils/generateRandomClipPath";
import getRandomNumber from "../utils/getRandomNumber";

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
        top: `${top * getRandomNumber(0.98, 1)}%`,
        left: `${left * getRandomNumber(0.99, 1)}%`,
        width: `${width * getRandomNumber(1, 1.1)}%`,
        height: `${height * getRandomNumber(1, 1.8)}%`,
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
