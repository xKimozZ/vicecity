import { createSlice, createSelector } from "@reduxjs/toolkit";

const translateFactor = 10;

const initialState = {
  statsTranslate: 0,
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
  },
});

const selectSelf = (state) => state.miscReducer;
export const miscSelector = createSelector(selectSelf, (state) => state);

export const { incrementStatsTranslate, decrementStatsTranslate } = miscSlice.actions;
export default miscSlice.reducer;
