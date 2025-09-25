import { Link, useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../Index";
import { IoIosArrowBack } from "react-icons/io";
import TaskBoilerPlate from "./TaskBoilerPlate";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { assignedTask } from "../../store/slice/assignedTaskSlice";

const AssignedTasks = () => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.login)
  const data = useSelector(state => state.assignedTask)

  const handleTaskData = () =>{
    axios.get("http://localhost:8000/api/task/assigned-tasks", {
    headers:{
      authorization: `Bearer ${token.refreshToken}`
    }
  })
  .then( (res) => {
    dispatch(assignedTask(res.data.data))
  } )
  .catch( (err) => console.log(err) )
  }

  useEffect( ()=>{
    handleTaskData()
  }, [] )

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
          <h1 className=" m-auto pr-[6rem] font-bold text-3xl py-[2rem] text-red-600 text-shadow-fuchsia-300 text-shadow-lg">Assigned Tasks</h1>
        </div>
        {/* <div className="bg-gray-300 rounded m-[1rem]">
          Filter
        </div> */}
        <div id="taskDiv" className=" flex flex-wrap justify-evenly overflow-y-scroll max-h-[50rem]">
          <TaskBoilerPlate data={data.data}/> 
        </div>
      </div>
    </div>
    <Footer/>
  </div>
}

export default AssignedTasks;