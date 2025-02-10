import { createSlice, createSelector } from "@reduxjs/toolkit";
import { languageMap, menuStrings } from "../constants/menuStrings";

const initialState = {
  language: languageMap.en,
  strings: menuStrings,
};

export const localizationSlice = createSlice({
  name: "localization",
  initialState,
  reducers: {
    local_setLanguage: (state, { payload }) => {
      const newLanguage = payload;
      state.language = newLanguage;
    },
  },
});

const selectSelf = (state) => state.localizationReducer;

export const languageSelector = createSelector(selectSelf,(state) => state.language);

// Specific section selectors
export const stringMenuSelector = createSelector(
  selectSelf,
  (state) => state.strings[state.language]?.menu || {}
);

export const stringBriefSelector = createSelector(
  selectSelf,
  (state) => state.strings[state.language]?.brief || {}
);

export const stringLanguageSelector = createSelector(
  selectSelf,
  (state) => state.strings[state.language]?.language || {}
);

export const stringLoadSelector = createSelector(
  selectSelf,
  (state) => state.strings[state.language]?.load || {}
);

export const stringStatsSelector = createSelector(
  selectSelf,
  (state) => state.strings[state.language]?.stats || {}
);

export const stringDisplaySelector = createSelector(
  selectSelf,
  (state) => state.strings[state.language]?.display || {}
);

export const stringNavSelector = createSelector(
  selectSelf,
  (state) => state.strings[state.language]?.nav || {}
);

export const { local_setLanguage } = localizationSlice.actions;
export default localizationSlice.reducer;
