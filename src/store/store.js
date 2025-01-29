import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from './cursorSlice'
import navigationReducer from "./navigationSlice";
import localizationReducer from "./localizationSlice";
import miscReducer from "./miscSlice";

export const TheStore = configureStore({
    reducer:{
        cursorReducer,
        navigationReducer,
        localizationReducer,
        miscReducer,
    }
});