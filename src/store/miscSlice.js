import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getRandomKey } from "../utils/math/getRandomObject";
import { menuStrings } from "../constants/menuStrings";
import { actionNames } from "../constants/actionNames";

const { DISPLAY } = actionNames;

const translateFactor = 10;

const initialState = {
  statsTranslate: 0,
  statsDirection: "down",
  statsLimit: 2800,
  lowerStatsLimit: 400,
  briefKey: getRandomKey(menuStrings.en.brief),

  barLastUpdate: 0,
  displaySettings: {
    [DISPLAY.BRIGHTNESS_ID]: 0.6875,
    [DISPLAY.TRAILS_ID]: true,
    [DISPLAY.SUBTITLES_ID]: true,
    [DISPLAY.WIDESCREEN_ID]: true,
    [DISPLAY.HUD_ID]: true,
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
    misc_setBarLastUpdate: (state, { payload }) => {
      const newBarLastUpdate = payload;
      state.barLastUpdate = newBarLastUpdate;
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
  misc_setBarLastUpdate,
} = miscSlice.actions;
export default miscSlice.reducer;
