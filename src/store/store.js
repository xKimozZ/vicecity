import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from './cursorSlice'
import navigationReducer from "./navigationSlice";

export const store = configureStore({
    reducer:{
        cursorReducer,
        navigationReducer,
    }
});