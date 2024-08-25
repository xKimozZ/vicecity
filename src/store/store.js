import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from './cursorSlice'
import navigationReducer from "./navigationSlice";
import localizationReducer from "./localizationSlice";

export const store = configureStore({
    reducer:{
        cursorReducer,
        navigationReducer,
        localizationReducer,
    }
});