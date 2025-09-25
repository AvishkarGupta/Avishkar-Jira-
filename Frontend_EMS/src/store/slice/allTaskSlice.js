import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
}

const allTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    allTask: (state, action)=>{
      state.data = action.payload

    }
  }
})

export const {allTask} = allTaskSlice.actions;

export default allTaskSlice.reducer