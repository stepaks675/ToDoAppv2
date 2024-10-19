import { createSlice } from "@reduxjs/toolkit";

const timerSlice = createSlice({
    name:"timer",
    initialState:{
        timestamp : Date.now()
    },
    reducers:{
        updateTime : (state)=>{
            state.timestamp=Date.now();
        }
    }
})
export const {updateTime} = timerSlice.actions;
export default timerSlice.reducer;