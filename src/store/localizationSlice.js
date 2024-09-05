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
    setLanguage: (state, { payload }) => {
      const newLanguage = payload;
      state.language = newLanguage;
    },
  },
});

const selectSelf = (state) => state.localizationReducer;
export const localizationSelector = createSelector(selectSelf, (state) => state);

export const languageSelector = createSelector(selectSelf,(state) => state.language);
export const stringSelector = createSelector(selectSelf,(state) => state.strings[state.language] || {});

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

export const { setLanguage } = localizationSlice.actions;
export default localizationSlice.reducer;
