import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import "bootstrap/dist/css/bootstrap.min.css"
import './index.css'
import {Provider} from "react-redux"
import { store } from './store/index.js'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router"
import {Layout, PreviewScreen, Login, ForgetPassword, Home, MyColleague } from "./componets/Index.js"
import {CreateNewtask, CreateNewUser, MyProfile, AllTasks, AssignedTasks, LifeAt, Careers, About, TasksID, WeAreHiring, KRA, FilterTasks, FilterTasksById} from "./componets/Pages/index.js"

import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persister = persistStore(store)



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='/' element={<PreviewScreen/>} />
      <Route path='/login' element={<Login />} />
      <Route path='/forget-password' element={<ForgetPassword/>} />
      <Route path='/home' element={<Home/>} />
      <Route path='/life-at-invention.io' element={<LifeAt/>} />
      <Route path='/careers' element={<Careers/>} />
      <Route path='/contact-us' element={<Careers/>} />
      <Route path='/about' element={<About/>} />
      <Route path='/my-profile' element={<MyProfile/>} />
      <Route path='/create-task' element={<CreateNewtask/>} />
      <Route path='/register-user' element={<CreateNewUser/>} />
      <Route path='/all-tasks' element={<AllTasks/>} />
      <Route path='/filter-tasks' element={<FilterTasks/>} />
      <Route path='/filter-tasks/:id' element={<FilterTasksById/>} />
      <Route path='/assigned-tasks' element={<AssignedTasks/>} />
      <Route path='/my-colleague' element={<MyColleague/>} />
      <Route path='/tasks/:id' element={<TasksID/>} />
      <Route path='/we-are-hiring' element={<WeAreHiring/>} />
      <Route path='/my-kra' element={<KRA/>} />
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
