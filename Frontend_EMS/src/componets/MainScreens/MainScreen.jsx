import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

const MainScreen = () => {

  const token = useSelector(state => state.login.data)
  const dispatch = useDispatch()
  const [allTask, setAllTask] = useState([])
  const [assignedTasks, setAssignedTasks] = useState([])
  const [createdTasks, setCreatedTasks] = useState([])
  const [blockerTasks, setBlockerTasks] = useState([])

  const handleAllTaskData = () =>{
    axios.get(`${API_URL}/api/task/all-tasks`, {
    headers:{
      authorization: `Bearer ${token.refreshToken}`
    }
  })
  .then( (res) => {
    setAllTask(res.data.data)
  } )
  .catch( (err) => console.log(err) )
  }

  const handleAssignedTaskData = () =>{
    axios.get(`${API_URL}/api/task/assigned-tasks`, {
    headers:{
      authorization: `Bearer ${token.refreshToken}`
    }
  })
  .then( (res) => {
    setAssignedTasks(res.data.data)
  } )
  .catch( (err) => console.log(err) )
  }

  const getCreatedTasks = (filterData)=>{

    axios.post(`${API_URL}/api/task/filterd-tasks`, filterData, {
    headers:{
      authorization: `Bearer ${token.refreshToken}`,
      "Content-Type": "application/json"
    }})
    .then( (res) => {
      setCreatedTasks(res.data.data)
    })
    .catch( (err) => console.log(err) )
  }

  const createdTaskFilter = {
    owner: token.Name,
    assignee: "NA",
    priority: "NA",
    category: "NA",
    status: "NA",
    name: ""}

  const getBlockersTasks = (filterData)=>{

    axios.post(`${API_URL}/api/task/filterd-tasks`, filterData, {
    headers:{
      authorization: `Bearer ${token.refreshToken}`,
      "Content-Type": "application/json"
    }})
    .then( (res) => {
      setBlockerTasks(res.data.data)
    })
    .catch( (err) => console.log(err) )
  }

  const BlockerTaskFilter = {
    owner: "NA",
    assignee: "NA",
    priority: "Blocker",
    category: "NA",
    status: "NA",
    name: ""}

  useEffect(()=>{
    handleAllTaskData()
    handleAssignedTaskData()
    getCreatedTasks(createdTaskFilter)
    getBlockersTasks(BlockerTaskFilter)
  }, [])

  return <div className="flex flex-col mt-17 w-full p-3 px-10 border h-svh">
    <div className="self-center text-5xl text-[#0e1a78] mb-5">
      DashBoard
    </div>
    <div className="flex flex-col w-full p-3 px-10 gap-10 ">
      <div className="flex w-full justify-between  gap-10 flex-wrap">
        <div className="flex flex-col items-center  min-w-[30rem] max-w-[30rem] max-h-[30rem] rounded border-blue-600 border-2">
        <div className="bg-blue-600 text-white font-semibold px-2 py-1 w-full">
          All Tickets
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          {allTask.length !== 0 ? allTask.map((task)=>{
            return <Link to={`/tasks/${task._id}`} className="max-h-6 overflow-hidden border-b-blue-600 border border-white px-1 bg-blue-100 rounded hover:bg-blue-200" key={task._id}>{task.title}</Link>
          }) : 
          <div className="flex justify-center items-center w-full">
            <div className="text-blue-600">
              NO Tasks to show
            </div>
          </div> }
        </div>
      </div>
      <div className="flex flex-col items-center  min-w-[30rem] max-w-[30rem] max-h-[30rem] rounded border-green-600 border-2">
        <div className="bg-green-600 text-white font-semibold px-2 py-1 w-full">
          Assigned Tickets
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          {assignedTasks.length !== 0 ? assignedTasks.map((task)=>{
            return <Link to={`/tasks/${task._id}`} className="max-h-6 overflow-hidden border-b-green-600 border border-white px-1 bg-green-100 rounded hover:bg-green-200" key={task._id}>{task.title}</Link>
          }) : 
          <div className="flex justify-center items-center w-full">
            <div className="text-green-600">
              NO Tasks to show
            </div>
          </div> }
        </div>
      </div>
      </div> 
      <div className="flex w-full justify-between gap-10 flex-wrap">
        <div className="flex flex-col items-center  min-w-[30rem] max-w-[30rem] max-h-[30rem] rounded border-yellow-300 border-2">
        <div className="bg-yellow-300 text-white font-semibold px-2 py-1 w-full">
          Created Tickets
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          {createdTasks.length !== 0 ? createdTasks.map((task)=>{
            return <Link to={`/tasks/${task._id}`} className="max-h-6 overflow-hidden border-b-yellow-300 border border-white px-1 bg-yellow-100 rounded hover:bg-yellow-200" key={task._id}>{task.title}</Link>
          }) : 
          <div className="flex justify-center items-center w-full">
            <div className="text-yellow-300">
              NO Tasks to show
            </div>
          </div> }
        </div>
      </div>
      <div className="flex flex-col items-center  min-w-[30rem] max-w-[30rem] max-h-[30rem] rounded border-red-600 border-2">
        <div className="bg-red-600 text-white font-semibold px-2 py-1 w-full">
          Blockers Tickets
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          {blockerTasks.length !== 0 ? blockerTasks.map((task)=>{
            return <Link to={`/tasks/${task._id}`} className="max-h-6 overflow-hidden border-b-red-600 border border-white px-1 bg-red-100 rounded hover:bg-red-200" key={task._id}>{task.title}</Link>
          }) : 
          <div className="flex justify-center items-center w-full">
            <div className="text-red-600">
              NO Tasks to show
            </div>
          </div> }
        </div>
      </div>
      </div>
    </div>

  </div>
}

export default MainScreen;
