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
    nav_setHoveredOption: (state, { payload }) => {
      const newHoveredOption = payload;
      state.hoveredOption = newHoveredOption;
    },
    nav_setButtonGroup: (state, { payload }) => {
      const newButtonGroup = payload;
      state.activeButtonGroup = newButtonGroup;
    },
    nav_setNextGroup: (state, { payload }) => {
      const newButtonGroup = payload;
      state.nextButtonGroup = newButtonGroup;
    },
    nav_setCurrentActions: (state, { payload }) => {
      const newActions = payload;
      state.currentActions = newActions;
    },
    nav_setKeyPressed: (state, { payload }) => {
      const newKeyPressed = payload;
      state.keyPressed = newKeyPressed;
    },
  },
});

const selectSelf = (state) => state.navigationReducer;
export const navigationSelector = createSelector(selectSelf, (state) => state);

export const { nav_setHoveredOption, nav_setButtonGroup, nav_setNextGroup, nav_setCurrentActions, nav_setKeyPressed } = navigationSlice.actions;
export default navigationSlice.reducer;
