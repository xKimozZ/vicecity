import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getRandomKey } from "../utils/getRandomObject";
import { menuStrings } from "../constants/menuStrings";

const translateFactor = 10;

const initialState = {
  statsTranslate: 0,
  statsDirection: "down",
  statsLimit: 2800,
  lowerStatsLimit: 400,
  briefKey: getRandomKey(menuStrings.en.brief),
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    incrementStatsTranslate: (state, { payload }) => {
      const newStatsTranslate = state.statsTranslate + translateFactor;
      if (newStatsTranslate >= state.lowerStatsLimit)
        {
          state.statsTranslate = -state.statsLimit;
          return;
        }
      state.statsTranslate = newStatsTranslate;
    },
    decrementStatsTranslate: (state, { payload }) => {
      const newStatsTranslate = state.statsTranslate - translateFactor;
      if (newStatsTranslate <= -state.statsLimit)
      {
        state.statsTranslate = state.lowerStatsLimit;
        return;
      }
      state.statsTranslate = newStatsTranslate;
    },
    toggleStatsDirection: (state, { payload }) => {
      const newStatsDirection = payload;
      state.statsDirection = newStatsDirection;
    },
    setStatsLimit: (state, { payload }) => {
      const newStatsLimit = payload;
      state.statsLimit = newStatsLimit;
    },
    setBriefKey: (state, { payload }) => {
      const newBriefKey = payload;
      state.briefKey = newBriefKey;
    },
  },
});

const selectSelf = (state) => state.miscReducer;
export const miscSelector = createSelector(selectSelf, (state) => state);

export const {
  incrementStatsTranslate,
  decrementStatsTranslate,
  toggleStatsDirection,
  setStatsLimit,
  setBriefKey,
} = miscSlice.actions;
export default miscSlice.reducer;
