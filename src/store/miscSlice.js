import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getRandomKey } from "../utils/math/getRandomObject";
import { menuStrings } from "../constants/menuStrings";

const translateFactor = 10;

const initialState = {
  statsTranslate: 0,
  statsDirection: "down",
  statsLimit: 2800,
  lowerStatsLimit: 400,
  briefKey: getRandomKey(menuStrings.en.brief),

  displaySettings: {
    trails: true,
    subtitles: true,
    widescreen: true,
  }
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    misc_incrementStatsTranslate: (state, { payload }) => {
      const newStatsTranslate = state.statsTranslate + translateFactor;
      if (newStatsTranslate >= state.lowerStatsLimit)
        {
          state.statsTranslate = -state.statsLimit;
          return;
        }
      state.statsTranslate = newStatsTranslate;
    },
    misc_decrementStatsTranslate: (state, { payload }) => {
      const newStatsTranslate = state.statsTranslate - translateFactor;
      if (newStatsTranslate <= -state.statsLimit)
      {
        state.statsTranslate = state.lowerStatsLimit;
        return;
      }
      state.statsTranslate = newStatsTranslate;
    },
    misc_toggleStatsDirection: (state, { payload }) => {
      const newStatsDirection = payload;
      state.statsDirection = newStatsDirection;
    },
    misc_setStatsLimit: (state, { payload }) => {
      const newStatsLimit = payload;
      state.statsLimit = newStatsLimit;
    },
    misc_setBriefKey: (state, { payload }) => {
      const newBriefKey = payload;
      state.briefKey = newBriefKey;
    },
    misc_setDisplaySettings: (state, { payload }) => {
      const newDisplaySettings = payload;
      state.displaySettings = newDisplaySettings;
    },
  },
});

const selectSelf = (state) => state.miscReducer;
export const miscSelector = createSelector(selectSelf, (state) => state);

export const {
  misc_incrementStatsTranslate,
  misc_decrementStatsTranslate,
  misc_toggleStatsDirection,
  misc_setStatsLimit,
  misc_setBriefKey,
  misc_setDisplaySettings,
} = miscSlice.actions;
export default miscSlice.reducer;
