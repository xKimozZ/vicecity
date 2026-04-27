import { createSlice, createSelector } from "@reduxjs/toolkit";
import { getRandomKey } from "../utils/math/getRandomObject";
import { menuStrings } from "../constants/menuStrings";
import { actionNames } from "../constants/actionNames";

const { DISPLAY, CONTROLS, MAP, AUDIO } = actionNames;

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
    [DISPLAY.CHANGING_POS]: false,
    [DISPLAY.BRIGHTNESS_ID]: 15/16,
    [DISPLAY.TRAILS_ID]: true,
    [DISPLAY.SUBTITLES_ID]: true,
    [DISPLAY.WIDESCREEN_ID]: true,
    [DISPLAY.HUD_ID]: true,
    [DISPLAY.RADAR_ID]: DISPLAY.RADAR_MAPBLIPS,
    [DISPLAY.SCREENPOS_ID]: {x:0, y:0},
  },

  controlsSettings: {
    [CONTROLS.CONFIG_ID]: CONTROLS.CONFIG_1,
    [CONTROLS.MODE_ID]: CONTROLS.MODE_CAR,
    [CONTROLS.VIB_ID]: false,
    [CONTROLS.FP_ID]: true,
  },

  mapSettings: {
    [MAP.LEGEND_ID]: true,
    [MAP.ZOOM]: 1,
    [MAP.PAN_X]: 0,
    [MAP.PAN_Y]: 0,
  },

  audioSettings: {
    [AUDIO.SFX_ID]: 13/16,
    [AUDIO.MUSIC_ID]: 13/16,
    [AUDIO.RADIO_ID]: AUDIO.RADIO_FLASH,
    [AUDIO.OUTPUT_ID]: false, // Stereo or DTS
  },
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
    misc_setControlsSettings: (state, { payload }) => {
      const newControlsSettings = payload;
      state.controlsSettings = newControlsSettings;
    },
    misc_setMapSettings: (state, { payload }) => {
      const newMapSettings = payload;
      state.mapSettings = newMapSettings;
    },
    misc_setAudioSettings: (state, { payload }) => {
      const newAudioSettings = payload;
      state.audioSettings = newAudioSettings;
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
  misc_setControlsSettings,
  misc_setAudioSettings,
  misc_setBarLastUpdate,
  misc_setMapSettings,
} = miscSlice.actions;
export default miscSlice.reducer;
