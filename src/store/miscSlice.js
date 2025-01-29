import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getRandomKey } from "../utils/math/getRandomObject";
import { menuStrings } from "../constants/menuStrings";
import { actionNames } from "../constants/actionNames";

const { DISPLAY } = actionNames;

//const translateFactor = 10;
const translateFactor = 1;
const TRANSLATE_SAFE_ZONE = 30; //px

const initialState = {
  statsTranslate: 0,
  statsDirection: "down",
  statsLimit: 2500,
  lowerStatsLimit: 250,
  briefKey: getRandomKey(menuStrings.en.brief),

  barLastUpdate: 0,
  displaySettings: {
    [DISPLAY.BRIGHTNESS_ACTION]: 15/16,
    [DISPLAY.TRAILS_ACTION]: true,
    [DISPLAY.SUBTITLES_ACTION]: true,
    [DISPLAY.WIDESCREEN_ACTION]: true,
    [DISPLAY.HUD_ACTION]: true,
    [DISPLAY.RADAR_ACTION]: DISPLAY.RADAR_MAPBLIPS,
    [DISPLAY.SCREENPOS_ACTION]: {x:0, y:0},
  }
};

export const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    misc_incrementStatsTranslate: (state, { payload }) => {
      let multiplier = 10;
      const speedMultiplier = payload ? payload : 1/10;
      multiplier *= speedMultiplier;

      const newStatsTranslate = state.statsTranslate + translateFactor * multiplier;
      if (newStatsTranslate >= state.lowerStatsLimit + TRANSLATE_SAFE_ZONE)
        {
          state.statsTranslate = -state.statsLimit;
          return;
        }
      state.statsTranslate = newStatsTranslate;
    },
    misc_decrementStatsTranslate: (state, { payload }) => {
      let multiplier = 10;
      const speedMultiplier = payload ? payload : 1/10;
      multiplier *= speedMultiplier;
      
      const newStatsTranslate = state.statsTranslate - translateFactor * multiplier;
      if (newStatsTranslate <= -state.statsLimit - TRANSLATE_SAFE_ZONE)
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
