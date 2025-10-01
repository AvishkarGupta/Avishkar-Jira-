import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import {Provider, useSelector} from "react-redux"
import { store } from './store/index.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router"
import {Layout, PreviewScreen, Login, ForgetPassword, Home, MyColleague, ProfileCard } from "./componets/Index.js"
import {CreateNewtask, CreateNewUser, MyProfile, AllTasks, AssignedTasks, LifeAt, Careers, About, TasksID, WeAreHiring, KRA, FilterTasks, FilterTasksById, GetProfileById} from "./componets/Pages/index.js"

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import ProtectedRoute from './componets/ProtectedRoute/ProtectedRoute.jsx'
import PublicRoute from './componets/PublicRoute/PublicRoute.jsx'

let persister = persistStore(store)


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      {/* unauthoraized route */}
      <Route element={<PublicRoute/>}>
      <Route path='/' element={<PreviewScreen/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/forget-password' element={<ForgetPassword/>} />
      <Route path='/life-at-invention.io' element={<LifeAt/>} />
      <Route path='/careers' element={<Careers/>} />
      <Route path='/contact-us' element={<Careers/>} />
      <Route path='/about' element={<About/>} />
      </Route>


      {/* Protected routes */}
      <Route element={<ProtectedRoute/>} >
      <Route path='/' element={<Home/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/forget-password' element={<Home/>} />
      <Route path='/my-profile' element={<MyProfile/>} />
      <Route path='/create-task' element={<CreateNewtask/>} />
      <Route path='/register-user' element={<CreateNewUser/>} />
      <Route path='/all-tasks' element={<AllTasks/>} />
      <Route path='/filter-tasks' element={<FilterTasks/>} />
      <Route path='/filter-tasks/:id' element={<FilterTasksById/>} />
      <Route path='/assigned-tasks' element={<AssignedTasks/>} />
      <Route path='/my-colleague' element={<MyColleague/>} />
      <Route path='/tasks/:id' element={<TasksID/>} />
      <Route path='/profile/:id' element={<GetProfileById/>} />
      </Route>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persister}>
        <RouterProvider id="main" router={router} />
      </PersistGate>
    </Provider>
  </StrictMode>,
)
