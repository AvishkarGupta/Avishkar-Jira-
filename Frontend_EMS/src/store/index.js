import { configureStore } from "@reduxjs/toolkit"
import loginReducer from "./slice/loginSlice"
import alltaskReducer from "./slice/allTaskSlice"
import ownedTaskReducer from "./slice/ownedTaskSlice"
import assignedTaskReducer from "./slice/assignedTaskSlice"
import teamReducer from "./slice/teamSlice"
import filterReducer from "./slice/filterSlice"
import savefilterReducer from "./slice/saveFiltersSlice"
import storage from "redux-persist/lib/storage"
import {persistReducer} from "redux-persist"
import { combineReducers } from "@reduxjs/toolkit"

const persistConfig = {
  key: "root",
  storage,
  blacklist: ['allTask', "ownedTask", "assignedTask"]
}

const reducer = combineReducers({
    login: loginReducer,
    allTask: alltaskReducer,
    ownedTask: ownedTaskReducer,
    assignedTask: assignedTaskReducer,
    teamProfile: teamReducer,
    filter: filterReducer,
    savefilter: savefilterReducer,

});

const persistedReducer = persistReducer(persistConfig, reducer) 

export const store = configureStore({
  reducer: persistedReducer,
})