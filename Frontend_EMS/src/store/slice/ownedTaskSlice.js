import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: []
  // assignedTo: "",
  // assigneeName: "",
  // category: "",
  // createdAt: "",
  // description: "",
  // dueDate: "",
  // owner: "",
  // ownerName: "",
  // priority: "",
  // resources: "",
  // status: "",
  // title: "",
  // updatedAt: "",
  // _id: ""
}

const ownedTaskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    ownedTask: (state, action)=>{
      state.data = action.payload

    }
  }
})

export const {ownedTask} = ownedTaskSlice.actions;

export default ownedTaskSlice.reducer