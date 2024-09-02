import { createSlice, createSelector } from "@reduxjs/toolkit";

const translateFactor = 10;

const initialState = {
  statsTranslate: 0,
  statsDirection: "down",
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    incrementStatsTranslate: (state, { payload }) => {
      const newStatsTranslate = state.statsTranslate + translateFactor;
      if (newStatsTranslate === 1000)
        {
          state.statsTranslate = -1000;
          return;
        }
      state.statsTranslate = newStatsTranslate;
    },
    decrementStatsTranslate: (state, { payload }) => {
      const newStatsTranslate = state.statsTranslate - translateFactor;
      if (newStatsTranslate === -1000)
      {
        state.statsTranslate = 1000;
        return;
      }
      state.statsTranslate = newStatsTranslate;
    },
    toggleStatsDirection: (state, { payload }) => {
      const newStatsDirection = payload;
      state.statsDirection = newStatsDirection;
    },
  },
});

const selectSelf = (state) => state.miscReducer;
export const miscSelector = createSelector(selectSelf, (state) => state);

export const { incrementStatsTranslate, decrementStatsTranslate, toggleStatsDirection } = miscSlice.actions;
export default miscSlice.reducer;
