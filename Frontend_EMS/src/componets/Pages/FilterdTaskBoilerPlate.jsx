import axios from "axios"
import { useState } from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const FilteredTaskBoilerPlate = ( {data} ) =>{

  const [iscommentReadOnly, setIscommentReadOnly] = useState(null)
  const [isReadOnly, setIsReadOnly] = useState(true)
  const userNames = useSelector(state => state.teamProfile)
  const token = useSelector(state => state.login.data)

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

  
  return <>
  {data.length === 0 ? <div className="text-2xl text-red-600 font-semibold mt-[10rem]"> No tasks found that matches the above query.</div> :
  data.map((task)=>{
    return <div id="task" key={task._id} className="rounded p-3 flex justify-evenly gap-5 w-[98%] overflow-x-scroll items-center my-3">
              <Link to={`/tasks/${task._id}`} id="taskResources" className="rounded">
                <div className="text text-blue-500 font-semibold min-w-[20rem] overflow-hidden ">{task.title || "Task Title"}</div>
              </Link>
              <div  className=" bg-red-500 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
                <select onChange={(e)=>{handlePriorityChange(task._id, "priority", e.target.value)}} className="outline-none bg-none" id="priority" name="priority" >
                    <option className="text-red-500 font-semibold bg-transparent" value={task.priority}>{task.priority}</option>
                    {task.priorityOptions ? task.priorityOptions.map((option) => {
                      return <option key={option} className="text-red-500 font-semibold bg-transparent outline-none" value={option}>{option}</option>
                    }) : ""}
                </select>
              </div>
              <div  className=" bg-yellow-400 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
                <select onChange={(e) => handleCategoryChange(task._id, "category", e.target.value)} className="outline-none bg-none" id="category" name="category" >
                    <option className="text-yellow-400 font-semibold bg-transparent" value={task.category}>{task.category}</option>
                    {task.categoryOptions ? task.categoryOptions.map((option) => {
                      return <option key={option} className="text-yellow-400 font-semibold bg-transparent outline-none" value={option}>{option}</option>
                    }) : ""}
                </select>
              </div>
              <div  className=" bg-green-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
                <select onChange={(e) => handleStatusChange(task._id, "status", e.target.value)} className="outline-none bg-none" name="status" id="status">
                  <option className="text-green-400 font-semibold bg-transparent" value={task.status}>{task.status}</option>
                    {task.statusOptions ? task.statusOptions.map((status)=>{
                      return <option className="text-green-400 font-semibold bg-transparent" key={status} value={status}>{status}</option>
                    }) : ""}
                </select>
              </div>
              <div className="flex bg-violet-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
                <p>Repoter: </p>
                <select onChange={(e) => handleOwnerChange(task._id, "owner", e.target.value)} className="outline-none bg-none" name="owner" id="owner">
                  <option className="text-violet-400 font-semibold bg-gray-200" value={task.ownerName}>{task.ownerName}</option>
                  {userNames.data ? userNames.data.map((name)=>{
                    return <option className="text-violet-700 font-semibold bg-transparent" key={name.Name} value={name.Name}>{name.Name}</option>
                  }) : ""}
                </select>
              </div>
              <div className="flex bg-blue-400 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
                <p>Assignee:</p>
                <select onChange={(e) => handleAssigneeChange(task._id, "assignee", e.target.value)} className="outline-none bg-none" name="owner" id="owner">
                  <option className="text-blue-400 font-semibold bg-gray-200" value={task.assigneeName}>{task.assigneeName}</option>
                  {userNames.data ? userNames.data.map((name)=>{
                    return <option className="text-blue-500 font-semibold bg-transparent" key={name.Name} value={name.Name}>{name.Name}</option>
                  }) : ""}
                </select>
              </div>
              <div className="flex justify-end gap-2">
                <p className="text-[0.8rem] text-gray-500">Due Date: </p>
                <input defaultValue={task.dueDate} className="text-[0.8rem] max-w-[5rem] font-semibold placeholder:text-black outline-none" />
              </div>
              <div className="flex justify-end gap-2">
                <p className="text-[0.8rem] text-gray-500">Created On: </p>
                <input defaultValue={task.createdAt.split("T")[0]} className="text-[0.8rem] max-w-[5rem] font-semibold placeholder:text-black outline-none" />
              </div>
            </div>
  
      

  })}

    

  </>
}

export default FilteredTaskBoilerPlate;



