import axios from "axios"
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { team } from "../../store/slice/teamSlice"
import { Link } from "react-router-dom"
import { FcDeleteRow } from "react-icons/fc";
import { CiEdit } from "react-icons/ci"
import { TfiNewWindow } from "react-icons/tfi";

const TaskBoilerPlate = ( {data} ) =>{

  const [iscommentReadOnly, setIscommentReadOnly] = useState(null)
  const [isReadOnly, setIsReadOnly] = useState(true)
  const userNames = useSelector(state => state.teamProfile)
  const token = useSelector(state => state.login)
  const dispatch = useDispatch()

  const handlePriorityChange = (taskID, field, value) => {
    
    const data = {taskID, [field]: value}
    console.log(data)

    axios.post("http://localhost:8000/api/task/update-priority", data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-type": "application/json"
    }})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=> console.log(err))
  }

  const handleCategoryChange = (taskID, field, value) => {
    
    const data = {taskID, [field]: value}
    console.log(data)

    axios.post("http://localhost:8000/api/task/update-category", data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-type": "application/json"
    }})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=> console.log(err))
  }

  const handleStatusChange = (taskID, field, value) => {
    
    const data = {taskID, [field]: value}
    console.log(data)

    axios.post("http://localhost:8000/api/task/update-status", data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-type": "application/json"
    }})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=> console.log(err))
  }

  const handleOwnerChange = (taskID, field, value) => {
    
    const data = {taskID, [field]: value}
    console.log(data)

    axios.post("http://localhost:8000/api/task/update-owner", data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-type": "application/json"
    }})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=> console.log(err))
  }

  const handleAssigneeChange = (taskID, field, value) => {
    
    const data = {taskID, [field]: value}
    console.log(data)

    axios.post("http://localhost:8000/api/task/update-assignee", data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-type": "application/json"
    }})
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=> console.log(err))
  }

  const handleUpdatedTitle = (taskID, field, value) => {

    const data = {taskID, [field]: value}
    console.log(data)

    axios.post("http://localhost:8000/api/task/update-title", data, {
      headers:{
        authorization: `Bearer ${token.refreshToken}`,
        "Content-Type": `application/json`
      }
    })
    .then((res) => console.log(res))
    .catch((err)=> console.log(err))
  } 
  
  const handleUpdatedDescription = (taskID, field, value) => {
    
    const data = {taskID, [field]: value}
    console.log(data)
    
    axios.post("http://localhost:8000/api/task/update-description", data, {
      headers:{
        authorization: `Bearer ${token.refreshToken}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => console.log(res))
    .catch(err => console.log(err))
  } 
  
  const handleUpdatedResources = (taskID, field, value) => {

    const data = {taskID, [field]: value}
    console.log(data)

    axios.post("http://localhost:8000/api/task/update-resources", data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => console.log(res))
    .catch((err)=>console.log(err))
    
  }
  
  // const getUserInfo = () => {

  //   axios.get("http://localhost:8000/api/users/all-users", {
  //   headers: {
  //     authorization: `Bearer ${token.refreshToken}`,
  //     "Content-Type": "application/json"
  //   }})
  //   .then((res)=>{
  //     // console.log(res.data.data)
  //     dispatch(team(res.data.data))
  //   })
  //   .catch((err)=> console.log(err))
  // }

  // useEffect(()=>{
  //     getUserInfo()
  // }, [])

  return <>
  {data.length === 0 ? <div className="text-2xl"> No Tasks Found taht matches the above query.</div> :
  data.map((task)=>{
      return <div id="task" key={task._id} className="rounded-2xl flex justify-evenly m-[1rem] w-[100%] ">
      <div className="my-[1rem] w-[77%] border-1 border-blue-100 bg-blue-50 rounded-2xl"> 
        <div className="mb-[1rem]">
          <div id="taskResources" className="mx-[3rem] overflow-y-scroll overflow-x-scroll rounded mt-2">
            <textarea 
              className="text-3xl max-h-[3.5rem] py-1 font-bold w-[100%] outline-violet-200 border-gray-400 rounded resize-none"  
              name="taskTitle" 
              id="taskTitle" 
              defaultValue={task.title || "Task Title"} 
              readOnly={isReadOnly} 
              onClick={() => {
                console.log("Title in focus")
                setIsReadOnly(false)
              }} 
              onBlur={(e) => {
                console.log("focus out")
                handleUpdatedTitle(task._id, "title", e.target.value)
                setIsReadOnly(true)
              }} 
            />
          </div>
        </div>
        <div key={task._id} className="flex justify-end flex-wrap gap-4 mx-[3rem]">
          <div className="flex justify-end object-fill flex-wrap">
            <div className="bg-red-500 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
              <select onChange={(e)=>{handlePriorityChange(task._id, "priority", e.target.value)}} className="outline-none bg-none" id="priority" name="priority" >
                  <option className="text-red-500 font-semibold bg-transparent" value={task.priority}>{task.priority}</option>
                  {task.priorityOptions ? task.priorityOptions.map((option) => {
                    return <option key={option} className="text-red-500 font-semibold bg-transparent outline-none" value={option}>{option}</option>
                  }) : ""}
              </select>
            </div>
          </div>
          <div className="flex justify-end object-fill flex-wrap">
          <div className="bg-yellow-400 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            <select onChange={(e) => handleCategoryChange(task._id, "category", e.target.value)} className="outline-none bg-none" id="category" name="category" >
                <option className="text-yellow-400 font-semibold bg-transparent" value={task.category}>{task.category}</option>
                {task.categoryOptions ? task.categoryOptions.map((option) => {
                  return <option key={option} className="text-yellow-400 font-semibold bg-transparent outline-none" value={option}>{option}</option>
                }) : ""}
            </select>
          </div>
          </div>
          <div className="flex justify-end object-fill flex-wrap">
          <div className="bg-green-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            <select onChange={(e) => handleStatusChange(task._id, "status", e.target.value)} className="outline-none bg-none" name="status" id="status">
              <option className="text-green-400 font-semibold bg-transparent" value={task.status}>{task.status}</option>
                {task.statusOptions ? task.statusOptions.map((status)=>{
                  return <option className="text-green-400 font-semibold bg-transparent" key={status} value={status}>{status}</option>
                }) : ""}
            </select>
          </div>
        </div>
        </div>
        <div className="mx-[3rem]">
          <p className="p-[0.5rem]  text-[0.8rem] text-gray-600">
            Description: 
          </p>
          <div id="taskResources" className="overflow-y-scroll overflow-x-scroll  rounded">
            <textarea 
              id="taskDescription" 
              className="p-[0.5rem] w-full bg-[rgba(246,230,9,0.03)] outline-none border-1 border-amber-400 rounded" 
              rows={10} 
              readOnly={isReadOnly} 
              onClick={() => {
                console.log("in focus")
                setIsReadOnly(false)
              }} 
              onBlur={(e) => {
                console.log("focus out")
                handleUpdatedDescription(task._id, "description", e.target.value)
                setIsReadOnly(true)
              }} 
              defaultValue={task.description || "Default text here"}
            />
          </div>
        </div>
        <div className="mx-[3rem]">
          <p className="p-[0.5rem]  text-[0.8rem] text-gray-600">
            Resources: 
          </p>
          <div id="taskResources" className="overflow-y-scroll overflow-x-scroll  rounded"> 
            <textarea 
              id="taskResources" 
              className="p-[0.5rem] bg-[rgba(246,230,9,0.03)] border-1 border-sky-400 outline-none rounded w-[100%]" 
              rows={5} 
              readOnly={isReadOnly} 
              onClick={(e) => {
                console.log("in foucs")
                setIsReadOnly(false)
              }} 
              onBlur={(e) => {
                console.log("out focus")
                setIsReadOnly(true)
                handleUpdatedResources(task._id, "resources", e.target.value)
              }} 
              defaultValue={task.resources || "Default text here"}
            />  
          </div>
        </div>

        <div className="boder-2 flex flex-col mx-[3rem] my-2 py-2 bg-[rgba(196,142,190,0.09)] border-1 border-gray-400 rounded">
          <p className="self-center p-[0.5rem]  text-[1rem] text-gray-600">
            Comments
          </p>
          <p className="ml-[1rem] text-gray-600 text-[0.8rem]">Most Recent Comment</p>
          {task.comment[0]?.content 
            ? 
            <div className="">
              <div className="border-1 mx-[1rem] rounded p-[0.3rem] bg-[rgba(224,22,89,0.04)]">
                <div className="flex justify-between">
                  <div className="flex gap-4">
                    <img className="ml-1 mt-0.5 border-2 w-[2rem] h-[1.5rem] rounded-[50%]" src={task?.comment[task?.comment.length-1]?.posterAvatar} alt="" />
                    <p className="text-[1.2rem] w-full pl-[1rem]">{task?.comment[task?.comment.length-1]?.posterName || "Avishkar Gupta"}</p>
                  </div>
                </div>
                <div key={task._id} className="flex justify-between pr-[1rem] ml-[3rem] pt-[1rem] mt-[0.5rem] border-t-1 border-blue-700">
                  <form
                    className="flex flex-wrap gap-3 w-[80%]"
                    onSubmit={(e)=>(handleCommentEditSave(e, task._id, "content", e.target.children[0]?.value))} //comment ID bhi chahiye ye dekhna padega: TODO
                  >
                    <textarea id={task._id}
                      className={`w-[80%] resize-none pl-[1rem] ${iscommentReadOnly === task._id ? "outline-1 rounded outline-blue-700 bg-[#2719c228]" : "outline-none"}`}
                      defaultValue={task?.comment[task?.comment.length-1]?.content}
                      readOnly={iscommentReadOnly !== task._id}
                    />
                  {
                    iscommentReadOnly == task._id 
                    ? 
                    <button
                      className="border-white bg-green-300 px-4 rounded"
                    >Save Comment
                    </button> 
                    : 
                    ""
                    }
                  </form>

                  <div className="flex gap-3 text-[0.8rem]">
                    <p>{new Date(task?.comment[task?.comment.length-1]?.createdAt).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                    <p>{new Date(task?.comment[task?.comment.length-1]?.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                  </div>
                </div>
              
              </div>
            </div>
            : 
            <div className="py-3 border-1 mx-[1rem] rounded px-[0.3rem] bg-[rgba(224,22,89,0.04)]">No Recent Comments</div>
            }
          
        </div>
      </div>
      <div className="w-[20%] my-[1rem] border-1 border-blue-100 bg-blue-50 rounded-2xl">
        <div className="">
          <div className="mx-[1rem] my-[1rem] bg-violet-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            {/* Owner: {task.ownerName} */}Repoter:
            <select onChange={(e) => handleOwnerChange(task._id, "owner", e.target.value)} className="outline-none bg-none" name="owner" id="owner">
              <option className="text-violet-400 font-semibold bg-gray-200" value={task.ownerName}>{task.ownerName}</option>
              {userNames.data ? userNames.data.map((name)=>{
                return <option className="text-violet-700 font-semibold bg-transparent" key={name.Name} value={name.Name}>{name.Name}</option>
              }) : ""}
            </select>
          </div>
          <div className="mx-[1rem] my-[1rem] bg-blue-400 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            {/* Assignee: {task.assigneeName} */}Assignee:
            <select onChange={(e) => handleAssigneeChange(task._id, "assignee", e.target.value)} className="outline-none bg-none" name="owner" id="owner">
              <option className="text-blue-400 font-semibold bg-gray-200" value={task.assigneeName}>{task.assigneeName}</option>
              {userNames.data ? userNames.data.map((name)=>{
                return <option className="text-blue-500 font-semibold bg-transparent" key={name.Name} value={name.Name}>{name.Name}</option>
              }) : ""}
            </select>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-end border-1 border-gray-200 bg-gray-50 m-1 px-[1rem] py-1 rounded">
          <div className="flex w-full justify-end">
          <input defaultValue={task.dueDate} className="text-[0.8rem] max-w-[5rem] font-semibold placeholder:text-black outline-none" />
            <p className="text-[0.8rem] text-gray-500">Due Date </p>
          </div>
          <div className="flex w-full justify-end">
          <input defaultValue={task.createdAt.split("T")[0]} className="text-[0.8rem] max-w-[5rem] font-semibold placeholder:text-black outline-none" />
            <p className="text-[0.8rem] text-gray-500">Created On </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 items-end border-1 border-gray-200 bg-gray-50 m-1 px-[1rem] py-1 rounded">
            <Link to={`/tasks/${task._id}`} className="flex gap-2 ">
              <p className="text-[0.8rem]">Detailed view</p>
              <TfiNewWindow />
            </Link>
        </div>
      </div>
    </div> 
  
      

  })}

    

  </>
}

export default TaskBoilerPlate;



