import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isUserLoggedIn: false, 
    Name: "", 
    firstName:"", 
    lastName:"", 
    email:"", 
    createdAt: "", 
    empId:"", 
    dateOfBirth:"", 
    dateOfJoining:"", 
    avatar: "", 
    refreshToken: null, 
    role: "", 
    updatedAt:"", 
    _id:"", 
    reportesTo:"",
    managerName:"",
    task:""}

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers:{
    loginUser:(state, action)=>{
        const data = action.payload
        state.Name = data.Name
        state.avatar = data.avatar
        state.createdAt = data.createdAt
        state.dateOfBirth = data.dateOfBirth
        state.dateOfJoining = data.dateOfJoining
        state.email = data.email
        state.empId = data.empId
        state.firstName = data.firstName
        state.lastName = data.lastName
        state.refreshToken = data.refreshToken
        state.role = data.role
        state.updatedAt = data.updatedAt
        state._id = data._id
        state.task = data.task
        state.reportesTo = data.reportesTo
        state.managerName = data.managerName
        if (data.refreshToken){
          state.isUserLoggedIn = true
        }
    },
    logoutUser:(state, action)=>{
        state.avatar = ""
        state.createdAt = ""
        state.dateOfBirth = ""
        state.email = ""
        state.empId = ""
        state.firstName = ""
        state.lastName = ""
        state.refreshToken = null
        state.role = null
        state.updatedAt = ""
        state._id = ""
        state.task = ""
        state.isUserLoggedIn = false
        state.Name = ""
        state.dateOfJoining = ""
        state.reportesTo = ""
        state.managerName = ""
        window.location.reload(true);
    }
  }
})

export const {employee, admin, loginUser, logoutUser} = loginSlice.actions;

export default loginSlice.reducer