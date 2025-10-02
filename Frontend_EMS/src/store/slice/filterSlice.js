import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filter:{},
  data:[]
}

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers:{
    addfilter: (state, action) =>{
      state.filter = action.payload

    },
    clearState: (state, action) =>{
      state.filter = action.payload
    },
    storeData: (state, action)=>{
      state.data = action.payload
    }
  }
})

export const {addfilter, clearState, storeData} = filterSlice.actions;
export default filterSlice.reducer 