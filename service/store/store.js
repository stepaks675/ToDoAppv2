import { configureStore } from "@reduxjs/toolkit";
import timerReducer from "./slices/timerSlice"
import todoReducer from "./slices/todoSlice"
const store = configureStore({
    reducer:{
    todo : todoReducer,
    timer : timerReducer
    }
})

export default store