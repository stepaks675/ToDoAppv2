import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name:"todo",
    initialState: {
        tasks: []
    },
    reducers:{
        setTasks: (state,action) =>{
            state.tasks = action.payload.tasks
        },
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
    }
})
export const {setTasks, addTask, deleteTask, toggleCompleted, expireTask} = todoSlice.actions
export default todoSlice.reducer