import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  hoveredOption: 1,
};

export const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setHoveredOption: (state, { payload }) => {
      const newHoveredOption = payload;
      state.hoveredOption = newHoveredOption;
    },
  },
});

const selectSelf = (state) => state.navigationReducer;
export const navigationSelector = createSelector(selectSelf, (state) => state);

export const { setHoveredOption } = navigationSlice.actions;
export default navigationSlice.reducer;
