import { createSlice, createSelector } from "@reduxjs/toolkit";
import { buttonGroups } from "../constants/buttonGroups";

const initialState = {
  hoveredOption: 1,
  nextButtonGroup: buttonGroups.MAP,
  activeButtonGroup: buttonGroups.MAIN,
  currentActions: {},
  keyPressed: false,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setHoveredOption: (state, { payload }) => {
      const newHoveredOption = payload;
      state.hoveredOption = newHoveredOption;
    },
    setButtonGroup: (state, { payload }) => {
      const newButtonGroup = payload;
      state.activeButtonGroup = newButtonGroup;
    },
    setNextGroup: (state, { payload }) => {
      const newButtonGroup = payload;
      state.nextButtonGroup = newButtonGroup;
    },
    setCurrentActions: (state, { payload }) => {
      const newActions = payload;
      state.currentActions = newActions;
    },
    setKeyPressed: (state, { payload }) => {
      const newKeyPressed = payload;
      state.keyPressed = newKeyPressed;
    },
  },
});

const selectSelf = (state) => state.navigationReducer;
export const navigationSelector = createSelector(selectSelf, (state) => state);

export const { setHoveredOption, setButtonGroup, setNextGroup, setCurrentActions, setKeyPressed } = navigationSlice.actions;
export default navigationSlice.reducer;
