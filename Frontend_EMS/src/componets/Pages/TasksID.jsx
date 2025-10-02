import { Link, useNavigate, useParams } from "react-router-dom";
import { Header } from "../Index";
import { TfiNewWindow } from "react-icons/tfi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { CiEdit } from "react-icons/ci";
import { FcDeleteRow } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { team } from "../../store/slice/teamSlice";

const TasksID = () =>{
  
  const [iscommentReadOnly, setIsCommentReadOnly] = useState(null)
  const [task, setTask] = useState({ 
    
    _id: "", 
    "owner": "", 
    "ownerName": "", 
    "assignedTo": "", 
    "assigneeName": "", 
    "title": "", 
    "description": "", 
    "category": "", 
    "status": "", 
    "resources": "", 
    "priority": "", 
    "dueDate": "", 
    "priorityOptions": [], 
    "statusOptions": [], 
    "categoryOptions": [], 
    "createdAt": "", 
    "updatedAt": "",
    "comment": [] 
  })

  const [isReadOnly, setIsReadOnly] = useState(true)
  const userNames = useSelector(state => state.teamProfile)
  const token = useSelector(state => state.login.data)
  const user = useSelector(state => state.login.data)
  const dispatch = useDispatch()
  const API_URL = import.meta.env.VITE_API_URL;
  
  const {id} = useParams();
  const data = {id}

  const gettask = () => {
    axios.post(`${API_URL}/api/task/get-task`, data, {
      headers:{
        authorization: `Bearer ${token.refreshToken}`,
        "content-type": "application/json"
      }
    })
    .then(res => {
      console.log(res.data.data)
      let data = res.data.data
      return setTask(data)
    })
    .catch(err => console.log(err))
  }

  const handlePriorityChange = (taskID, field, value) => {
    
    const data = {taskID, [field]: value}
    console.log(data)

    axios.post(`${API_URL}/api/task/update-priority`, data, {
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

    axios.post(`${API_URL}/api/task/update-category`, data, {
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

    axios.post(`${API_URL}/api/task/update-status`, data, {
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

    axios.post(`${API_URL}/api/task/update-owner`, data, {
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

    axios.post(`${API_URL}/api/task/update-assignee`, data, {
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

    axios.post(`${API_URL}/api/task/update-title`, data, {
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
    
    axios.post(`${API_URL}/api/task/update-description`, data, {
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

    axios.post(`${API_URL}/api/task/update-resources`, data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-Type": "application/json"
      }
    })
    .then((res) => console.log(res))
    .catch((err)=>console.log(err))
    
  }

  const handleCommentSubmition = (e, taskID, field, value) => {
    
    e.preventDefault()
    const data = {taskID, [field]: value}
    console.log(data)
    
    axios.post(`${API_URL}/api/comment/add-comment`, data, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log("add comment response", res.data.data)
      setTask(res.data.data)
    })
    .catch(err => console.log(err))
    
  } 
  
  const handleCommentDelete = (taskID, commentID) =>{
    console.log(taskID, commentID)

    const data = {
      taskID, commentID
    }

    axios.post(`${API_URL}/api/comment/delete-comment`, data, {
      headers:{
       authorization: `Bearer ${token.refreshToken}`,
       "Content-Type": "application/json" 
      }
    })
    .then(res => {
      console.log("Delete response", res)
      setTask(res.data.data)
    })
    .catch(err => console.log(err))
  }

  const handleCommentEditbutton = (e, taskID, commentID, field, value) =>{
    console.log("Button can be edit now", e)
    setIsCommentReadOnly(commentID)
  }
  
  const handleCommentEditState = () =>{
    console.log("Envet called")
    setTimeout(()=>{
      setIsCommentReadOnly(null)
    }, 500)
    
  }

  const handleCommentEditSave = (e, taskID, commentID, field, value) =>{
    console.log(e)
    e.preventDefault()
    
    const data = {
      taskID,
      commentID,
      [field]: value
    }
    console.log(data)
    axios.post(`${API_URL}/api/comment/edit-comment`, data, {
      headers:{
        authorization: `Bearer ${token.refreshToken}`,
        "Content-Type": "application/json"
      }
    })
    .then((res)=>{
      console.log(res)
    })
    .catch((err)=>{
      console.log(err)
    })
    .finally(()=>{
      setTimeout(()=>{
      setIsCommentReadOnly(null)
    }, 500)
    })
  }


  const getUserInfo = () => {
    
    axios.get(`${API_URL}/api/users/all-users`, {
      headers: {
        authorization: `Bearer ${token.refreshToken}`,
        "Content-Type": "application/json"
      }})
      .then((res)=>{
        console.log(res.data.data)
        dispatch(team(res.data.data))
      })
      .catch((err)=> console.log(err))
  }
    
  useEffect(()=>{
    gettask()
    getUserInfo()
  }, [])

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };

    return <>
  <Header/>
  <Link onClick={goBack} className="bottom-[-5.5rem] pl-[1rem] py-[0.5rem] relative flex"><IoIosArrowBack /> <span className="relative bottom-1">Back</span></Link>
  <div id="seprateTask" key={task._id} className="rounded-2xl flex justify-evenly w-[screen] m-[1rem] mt-22">
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

        <div className="boder-2 flex flex-col mx-[3rem] my-2 bg-[rgba(196,142,190,0.09)] border-1 border-gray-400 rounded">
          <p className="self-center p-[0.5rem]  text-[1rem] text-gray-600">
            Comments
          </p>
          <p className="ml-[1rem] text-gray-600 text-[0.8rem]">All Comment</p>
          {/* comment loop */}
          {task.comment.map((comment)=>{
            return <div key={comment._id} className="my-2">
            <div className="border-1 border-gray-400 mx-[1rem] rounded p-[0.3rem] bg-[rgba(224,22,89,0.04)]">
              <div className="flex justify-between">
                <div className="flex gap-4">
                  <img className="ml-1 mt-0.5 border-2 w-[2rem] h-[1.5rem] rounded-[50%]" src={comment.posterAvatar} alt="" />
                  <p className="text-[1.2rem] w-full pl-[1rem]">{comment.posterName || "Avishkar Gupta"}</p>
                </div>
                <div className="mr-[1rem] flex gap-5">
                  {user.Name == comment.posterName ? <>
                  <Link 
                    id={comment._id} 
                    onClick={(e)=>{handleCommentEditbutton(e, id, comment._id)}} 
                    className="text-[1.5rem]">
                      <CiEdit />
                  </Link>
                  <Link 
                    id={comment._id} 
                    onClick={(e)=>{handleCommentDelete(id, comment._id)}} 
                    className="text-[1.5rem]">
                      <FcDeleteRow />
                  </Link>
                  </> : ""}
                </div>
              </div>
              <div className={` flex gap-3 flex-wrap justify-between pr-[1rem] ml-[3rem] pt-[1rem] mt-[0.5rem] pb-[0.5rem] border-t-1 border-blue-700 ${iscommentReadOnly === comment._id ? "" : ""}`}>
                {/* <div className="flex gap-2 border-2"> */}
                  <form
                    className="flex flex-wrap gap-3 w-[70%]"
                    onSubmit={(e)=>(handleCommentEditSave(e, task._id, comment._id, "content", e.target.children[0]?.value))}
                    onBlur={handleCommentEditState}
                  >
                    <textarea id={comment._id}
                      className={`w-[100%] resize-none pl-[1rem] min-h-[100px] ${iscommentReadOnly === comment._id ? "outline-1 rounded outline-blue-700 bg-[#2719c228]" : "outline-none"}`}
                      defaultValue={comment.content}
                      // onBlur={handleCommentEditState} 
                      readOnly={iscommentReadOnly !== comment._id}
                    />
                  {
                  iscommentReadOnly == comment._id 
                  ? 
                  <button
                    className="border-2 border-green-400 shadow-2xl shadow-emerald-800 bg-green-300 px-4 rounded"
                  >Save Changes
                  </button> 
                  : 
                  ""
                  }
                  </form>
                <div className="flex gap-3 text-[0.8rem] font-semibold">
                  <p>{new Date(comment.createdAt).toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                  <p>{new Date(comment.createdAt).toLocaleDateString("en-IN", { timeZone: "Asia/Kolkata" })}</p>
                </div>
              </div>
            </div>
            </div>
          }) 
            }
          <div id="taskResources" className="p-[0.5rem] overflow-scroll max-h-50 min-h-30 ">
            <form 
              onSubmit={(e)=>(handleCommentSubmition(e, task._id, "comment", e.target.children[0]?.value))} 
              className="flex flex-col"
            >
              <textarea 
                className="border-gray-400 border-1 outline-none p-[0.5rem] rounded w-[100%]" 
                rows={3} 
                type="text" 
                required
                placeholder="Add new comment"
              />
              <button type="submit" className="text-[0.8rem] text-white font-semibold self-end bg-gray-500 mt-[0.5rem] p-[0.2rem] rounded">Add comment</button>
            </form>
          </div>
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
          <input defaultValue={task.createdAt?.split("T")[0]} className="text-[0.8rem] max-w-[5rem] font-semibold placeholder:text-black outline-none" />
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
  </>
}

export default TasksID;