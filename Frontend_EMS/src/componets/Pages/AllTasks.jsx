import { Link, useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../Index";
import { IoIosArrowBack } from "react-icons/io";
import TaskBoilerPlate from "./TaskBoilerPlate";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allTask } from "../../store/slice/allTaskSlice";
import { useState } from "react";
import { addfilter, clearState } from "../../store/slice/filterSlice";
import { team } from "../../store/slice/teamSlice";
const API_URL = import.meta.env.VITE_API_URL;

const AllTasks = ( ) => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.login.data)
  const data = useSelector(state => state.allTask)


  //get all uesr
  const getUserInfo = () => {

    axios.get(`${API_URL}/api/users/all-users`, {
    headers: {
      authorization: `Bearer ${token.refreshToken}`,
      "Content-Type": "application/json"
    }})
    .then((res)=>{
      dispatch(team(res.data.data))
    })
    .catch((err)=> console.log(err))
  }


  // Api for all task
  const handleTaskData = () =>{
    axios.get(`${API_URL}/api/task/all-tasks`, {
    headers:{
      authorization: `Bearer ${token.refreshToken}`
    }
  })
  .then( (res) => {
    dispatch(allTask(res.data.data))
  } )
  .catch( (err) => console.log(err) )
  }

  
 
  useEffect( ()=>{
    handleTaskData()
    getUserInfo()
  }, [])

  const navigate = useNavigate()
  const goBack = () => {
    navigate(-1)
  }


  return<div className="">
    <Header/>
    <div className="flex min-h-[60rem]">
      <Sidebar/>
      <div className="mt-17 w-[80%]">
        <div className="flex">
          <Link onClick={goBack} className="bottom-[-1rem] left-[1rem] relative flex"><IoIosArrowBack /> <span className="relative bottom-1">Back</span></Link>
          <h1 className=" m-auto pr-[6rem] font-bold text-3xl py-[2rem] text-red-600 text-shadow-fuchsia-300 text-shadow-lg">All Tasks</h1>
        </div>
        <div id="taskDiv" className=" flex flex-wrap justify-evenly overflow-y-scroll max-h-[50rem]">
          <TaskBoilerPlate data={data.data}/> 
        </div>
      </div>
    </div>
    <Footer/>
  </div>
}

export default AllTasks;