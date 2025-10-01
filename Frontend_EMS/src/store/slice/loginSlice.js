import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data:{}
}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers:{
    loginUser:(state, action)=>{
        state.data = action.payload
    },
    logoutUser:(state, action)=>{
        state.data= {}
        // window.location.reload(true);
    }
  }
})

export const {employee, admin, loginUser, logoutUser} = loginSlice.actions;

export default loginSlice.reducer