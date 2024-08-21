import { configureStore } from "@reduxjs/toolkit";
import cursorReducer from './cursorSlice'

export const store = configureStore({
    reducer:{
        cursorReducer,
    }
});