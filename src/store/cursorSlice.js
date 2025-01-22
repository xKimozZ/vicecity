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

const defaultClipFactor = 13;
const defaultTopFactor = 0.98;
const defaultLeftFactor = 0.99;
const defaultWidthFactor = 1.1;
const defaultHeightFactor = 1.8;

export const cursorSlice = createSlice({
  name: "cursor",
  initialState,
  reducers: {
    cursor_changeLocation: (state, { payload }) => {
      const {
        top = "0%",
        left = "0%",
        width = "0%",
        height = "0%",
        clipFactor = defaultClipFactor,
        topFactor = defaultTopFactor,
        leftFactor = defaultLeftFactor,
        widthFactor = defaultWidthFactor,
        heightFactor = defaultHeightFactor,
      } = payload;

      const newPositionStyle = {
        top: `${top * getRandomNumber(topFactor, 1)}%`,
        left: `${left * getRandomNumber(leftFactor, 1)}%`,
        width: `${width * getRandomNumber(1, widthFactor)}%`,
        height: `${height * getRandomNumber(1, heightFactor)}%`,
      };

      const newClipPathStyle = {
        clipPath: generateRandomClipPath(clipFactor),
      };

      state.positionStyle = newPositionStyle;
      state.clipPathStyle = newClipPathStyle;
    },
  },
});

const selectSelf = (state) => state.cursorReducer;
export const cursorSelector = createSelector(selectSelf, (state) => state);

export const { cursor_changeLocation } = cursorSlice.actions;
export default cursorSlice.reducer;
