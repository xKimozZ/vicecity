import { createSlice, createSelector } from "@reduxjs/toolkit";
import generateRandomClipPath from "../utils/math/generateRandomClipPath";
import getRandomNumber from "../utils/math/getRandomNumber";

const DEFAULT_CLIP_FACTOR = 13;
const DEFAULT_TOP_FACTOR = 0.98;
const DEFAULT_LEFT_FACTOR = 0.99;
const DEFAULT_WIDTH_FACTOR = 1.1;
const DEFAULT_HEIGHT_FACTOR = 1.8;

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
  storedFactors: {
    storedClipFactor : DEFAULT_CLIP_FACTOR,
    storedTopFactor : DEFAULT_TOP_FACTOR,
    storedLeftFactor : DEFAULT_LEFT_FACTOR,
    storedWidthFactor : DEFAULT_WIDTH_FACTOR,
    storedHeightFactor : DEFAULT_HEIGHT_FACTOR,
  },
  resetToggle: true,
};

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
        clipFactor = state.resetToggle ? DEFAULT_CLIP_FACTOR :state.storedFactors.storedClipFactor,
        topFactor = state.resetToggle ? DEFAULT_TOP_FACTOR :state.storedFactors.storedTopFactor,
        leftFactor = state.resetToggle ? DEFAULT_LEFT_FACTOR :state.storedFactors.storedLeftFactor,
        widthFactor = state.resetToggle ? DEFAULT_WIDTH_FACTOR :state.storedFactors.storedWidthFactor,
        heightFactor = state.resetToggle ? DEFAULT_HEIGHT_FACTOR :state.storedFactors.storedHeightFactor,
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
      state.storedFactors = {
        storedClipFactor : clipFactor,
        storedTopFactor : topFactor,
        storedLeftFactor : leftFactor,
        storedWidthFactor : widthFactor,
        storedHeightFactor : heightFactor,
      };

      // state.resetToggle = !state.resetToggle;
    },
  },
});

const selectSelf = (state) => state.cursorReducer;
export const cursorSelector = createSelector(selectSelf, (state) => state);

export const { cursor_changeLocation } = cursorSlice.actions;
export default cursorSlice.reducer;
