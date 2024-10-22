import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const fetchTasks = createAsyncThunk(
  "todoSlice/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axios.get("/api/tasks");
      return resp.data;
    } catch {
      return rejectWithValue(error.response.data);
    }
  }
);

const asyncAddTask = createAsyncThunk(
  "todoSlice/asyncAddTask",
  async (task, { rejectWithValue }) => {
    try {
      await axios.post("/api/tasks", { ...task });
      return task;
    } catch {
      return rejectWithValue(error.response.data);
    }
  }
);

const asyncRemoveTask = createAsyncThunk(
  "todoSlice/asyncRemoveTask",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/api/tasks/${id}`);
      return id;
    } catch {
      return rejectWithValue(error.response.data);
    }
  }
);

const asyncToggleCompleted = createAsyncThunk(
    "todoSlice/asyncChangeTask",
    async (id, { rejectWithValue }) => {
        try {
            await axios.put(`/api/tasks/${id}`, {id, method: "completed"});
            return id;
        } catch (error) {
        }
    }
)
const asyncExpire = createAsyncThunk(
    "todoSlice/asyncExpire",
    async (id, { rejectWithValue }) => {
        try {
            await axios.put(`/api/tasks/${id}`, {id, method: "expired"});
            return id;
        } catch (error) {
        }
    }
)
const todoSlice = createSlice({
  name: "todo",
  initialState: {
    tasks: [],
    status: null,
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.status = "fullfilled";
    });
    builder.addCase(asyncAddTask.fulfilled, (state, action) => {
      state.tasks.push(action.payload);
    });
    builder.addCase(asyncRemoveTask.fulfilled, (state, action) => {
      const id = action.payload;
      state.tasks = state.tasks.filter((item) => item.id != id);
    });
    builder.addCase(asyncExpire.fulfilled, (state, action)=>{
        state.tasks = state.tasks.map((item) =>
            item.id == action.payload ? { ...item, isExpired: true } : { ...item })
    });
    builder.addCase(asyncToggleCompleted.fulfilled, (state, action)=>{
        state.tasks = state.tasks.map((item) =>
            item.id == action.payload
              ? { ...item, isCompleted: !item.isCompleted }
              : { ...item }
          );
    });
  }
})

export { fetchTasks, asyncAddTask, asyncRemoveTask, asyncExpire, asyncToggleCompleted };
export default todoSlice.reducer;
