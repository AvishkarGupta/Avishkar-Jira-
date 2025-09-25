import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  filters:[]
}

const saveFilters = createSlice({
  name: "saveFilter",
  initialState,
  reducers:{
    save: (state, action) =>{
      state.filters = [...state.filters, action.payload];
      // console.log(store.getState().saveFilter.filters);
    },
    clearAllSavedFilters: (state, action) =>{
      state.filters = []
    }
  }
})

export const {save, clearAllSavedFilters} = saveFilters.actions;
export default saveFilters.reducer