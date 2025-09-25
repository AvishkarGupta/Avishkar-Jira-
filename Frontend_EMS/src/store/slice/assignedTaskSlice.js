import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
}

const assignedTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    assignedTask: (state, action)=>{
      state.data = action.payload

    }
  }
})

export const {assignedTask} = assignedTaskSlice.actions;

export default assignedTaskSlice.reducer