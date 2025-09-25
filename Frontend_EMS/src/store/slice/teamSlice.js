import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
}

const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    team: (state, action)=>{
      state.data = action.payload
    }
  }
})

export const {team} = teamSlice.actions;

export default teamSlice.reducer;