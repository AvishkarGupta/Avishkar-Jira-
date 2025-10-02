import axios from "axios"
import {Header, Sidebar} from "../Index"
import { useEffect, useRef, useState} from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { IoIosArrowBack } from "react-icons/io";
import { team } from "../../store/slice/teamSlice"
const API_URL = import.meta.env.VITE_API_URL;

const CreateNewtask = () =>{

  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const token = useSelector(state => state.login.data)
  const membersName = useSelector(state => state.teamProfile)
  
  const [created, setCreated] = useState("")
  const [error, setError] = useState("")

  const data = useSelector(state => state.login.data)

  const titleValue = useRef()
  const descriptionValue = useRef()
  const categoryValue = useRef()
  const statusValue = useRef()
  const resourcesValue = useRef()
  const priorityValue = useRef()
  const dueDateValue = useRef()
  const assigneeValue = useRef()

  const handlecreateTask = (e) =>{
    e.preventDefault()
    const title = titleValue.current.value
    const description = descriptionValue.current.value
    const category = categoryValue.current.value
    const status = statusValue.current.value
    const resources = resourcesValue.current.value
    const priority = priorityValue.current.value
    const dueDate = dueDateValue.current.value
    const assignee = assigneeValue.current.value 

    axios({
      method:"post", 
      url: `${API_URL}/api/task/create-task`, 
      data: {
        title, 
        description,
        category,
        status,
        resources,
        priority,
        dueDate,
        assignee
      },
      headers: {
      authorization: `Bearer ${data.refreshToken}`,
      "Content-Type": "application/json"
    }
    })
    .then((res) => {
      setCreated(res.data.message)
      setTimeout(()=>{
        navigate("/home")
      }, 2000)
    }
    )
    .catch(err => {
      console.log(err)
      setError("Something Went wrong while creating task!")
    })
    
  }
  
  
  const handleTeamData = ()=>{
    axios.get(`${API_URL}/api/users/all-users`, {headers:{
      authorization: `Bearer ${token.refreshToken}`
    }})
    .then((res)=>{
      dispatch(team(res.data.data))
    })
    .catch((err)=>{console.log(err)})
  }

  useEffect(()=>{
    handleTeamData()
  }, [])
  
  const goBack = () => {
    return navigate(-1)
  }


  return <>
    <Header/>
      <div className="flex">
        <Sidebar/>
        <div className="mt-17 flex flex-col items-center justify-center w-full">
          <Link onClick={() =>{goBack()}} className="self-start relative top-[1rem] flex"><IoIosArrowBack /> <span className="relative bottom-1">Back</span></Link>
          <h2 className=" font-bold text-3xl text-amber-700 p-3 mb-3 mx-auto">Create Task</h2>
          <div className={`text-red-600 font-bold mb-2`}>{error}</div>
          <div className={`text-green-600 font-bold mb-2`}>{created}</div>
          <form  id="CreateNewtask" onSubmit={handlecreateTask} className="flex rounded justify-between border border-blue-200  mb-10">
            <div>
              <div className="pb-5 flex flex-col ">
                <label name="title" className="pb-1 font-semibold">Task Title</label>
                <input
                  ref={titleValue} 
                  className="border-b-1 border-gray-400 w-[20rem] rounded outline-none px-2 p-0.4 " 
                  type="text" 
                  name="title"
                  placeholder="Task Title" 
                  required
                />
              </div>
              <div className="pb-5 flex flex-col ">
                <label name="resources" className="pb-1 font-semibold">Resources</label>
                <input
                  ref={resourcesValue} 
                  className="border-b-1 border-gray-400 w-[20rem] rounded outline-none px-2 p-0.4 " 
                  type="text"  
                  name="resources"
                  placeholder="Please provide resource URL"
                />
              </div>
              <div className="pb-5 flex flex-col ">
                <label name="empolyee name" className="pb-1 font-semibold">Assignee</label>
                <select
                  ref={assigneeValue} 
                  className="border-b-1 border-gray-400 w-[20rem] rounded outline-none px-2 p-0.4 " 
                  type="text" 
                  name="empolyee name"
                  required
                >
                  {membersName.data.map((name)=> {
                    return <option key={name._id} value={name.Name} className="text-gray-500">{name.Name}</option>
                  })}
                </select>
              </div>
              <div className="pb-5 flex flex-col ">
                <label name="category" className="pb-1 font-semibold">Category</label>
                <select
                  ref={categoryValue} 
                  className="border-b-1 border-gray-400 w-[20rem] rounded outline-none px-2 p-0.4 " 
                  type="text" 
                  name="category" 
                  placeholder="Please specify the categary" 
                  required
                  >
                    <option className="text-gray-500" value="Development">Development</option>
                    <option className="text-gray-500" value="QA">QA</option>
                    <option className="text-gray-500" value="UI and UX">UI and UX</option>
                    <option className="text-gray-500" value="Debugging">Debugging</option>
                </select>
              </div>
              <div className="pb-5  flex flex-col ">
                <label name="dueDate" className="pb-1 font-semibold">Due Date</label>
                <input
                  ref={dueDateValue} 
                  className="border-b-1 border-gray-400 w-[20rem] rounded outline-none px-2 p-0.4 " 
                  type="date" 
                  name="dueDate"
                />
              </div>
              <div className="pb-5 flex flex-col ">
                <label name="Priority" className="pb-1 font-semibold">Priority</label>
                <select
                  ref={priorityValue} 
                  className="border-b-1 border-gray-400 w-[20rem] rounded outline-none px-2 p-0.4 " 
                  type="text" 
                  name="Priority"
                  required
                >
                  <option className="text-gray-500" value="Low">Low</option>
                  <option className="text-gray-500" value="High">High</option>
                  <option className="text-gray-500" value="Medium">Medium</option>
                  <option className="text-gray-500" value="Blocker">Blocker</option>
                </select>
              </div>
              <div className="pb-5 flex flex-col ">
                <label name="status" className="pb-1 font-semibold">Status</label>
                <select
                  ref={statusValue} 
                  className="border-b-1 border-gray-400 w-[20rem] rounded outline-none px-2 p-0.4 " 
                  type="text" 
                  name="status"
                  placeholder="New Task"
                >
                  <option className="text-gray-500" value="New">New</option>
                  <option className="text-gray-500" value="To do">To do</option>
                  <option className="text-gray-500" value="In Progress">In Progress</option>
                  <option className="text-gray-500" value="In Verification">In Verification</option>
                  <option className="text-gray-500" value="RFV">RFV</option>
                  <option className="text-gray-500" value="Resolved">Resolved</option>
                  <option className="text-gray-500" value="Closed">Closed</option>
                  <option className="text-gray-500" value="Re Opened">Re Opened</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col ">
              <div className="flex flex-col ">
                <label name="description" className="">Description</label>
                <textarea 
                  ref={descriptionValue}
                  className="w-[20rem] rounded border-1 border-gray-400 outline-none px-2 p-0.4 mt-3" 
                  rows={6} 
                  name="description" 
                  placeholder="Describe the task" 
                />
              </div>
              <button className="font-semibold mt-4 py-1 px-10 self-center w-[10rem] rounded text-white bg-green-400 shadow-emerald-300 shadow-lg">Create Task</button>
            </div>
          </form>
        </div>
      </div>
  
  </>
}

export default CreateNewtask;


