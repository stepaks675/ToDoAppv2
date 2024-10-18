import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTasks = createAsyncThunk(
    'todoSlice/fetchTasks',
    async (_,{rejectWithValue}) => {
        try{
            const resp = await axios.get("/api/tasks")
            return resp.data;
        }
        catch{
            return rejectWithValue(error.response.data)
        }
    }
)

const todoSlice = createSlice({
    name:"todo",
    initialState: {
        tasks: [],
        status: null,
        error:null
    },
    reducers:{
        addTask: (state,action) => {
            const deadline = new Date(action.payload.deadline || Date.now()+1000*60*60).getTime();
            const desc = action.payload.desc;
            const id = Math.max(...state.tasks.map(item => item.id+1),1)
            state.tasks.push({id, desc, deadline, isCompleted: false, isExpired: false})  
            console.log(`запушена задача ${id} ${desc} ${deadline}`)       
        },
        deleteTask: (state,action) => {
            const id = action.payload.id;
            console.log(state.tasks.length)
            state.tasks = state.tasks.filter(item => item.id!=id);
        },
        toggleCompleted: (state,action)=>{
            const id = action.payload.id;
            state.tasks = state.tasks.map(item => item.id==id  ? {...item,isCompleted: !item.isCompleted} :  {...item})
        },
        expireTask: (state,action)=>{
            const id = action.payload.id;
            state.tasks = state.tasks.map(item => item.id==id  ? {...item,isExpired: true} :  {...item})
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchTasks.pending, (state)=>{
            state.status = "pending"
        })
        builder.addCase(fetchTasks.fulfilled, (state,action)=>{
            state.tasks = action.payload
            state.status = "fullfilled"
        })
        builder.addCase(fetchTasks.rejected, (state,action) => {
            state.status = "error"
            state.error = action.payload
        })

    }
})
export const {addTask, deleteTask, toggleCompleted, expireTask} = todoSlice.actions
export {fetchTasks}
export default todoSlice.reducer