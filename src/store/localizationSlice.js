import { createSlice, createSelector } from "@reduxjs/toolkit";
import { menuStrings } from "../constants/menuStrings";

const initialState = {
  language: 'en',
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

export const { setLanguage } = localizationSlice.actions;
export default localizationSlice.reducer;
