import { useDispatch, useSelector } from "react-redux";
import { Footer, Header, Sidebar } from "../Index";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import EditProfilePopUpModel from "./EditProfilePopUpModel";
import { loginUser } from "../../store/slice/loginSlice";
const API_URL = import.meta.env.VITE_API_URL;

const MyProfile = () => {

  const [editModel, setEditModel] = useState(false)
  const [readOnly, setReadOnly] = useState(true)
  const [assignedTask, setAssignedTask] = useState([])
  const [createdTask, setCreatedTask] = useState([])
  const [team, setTeam] = useState([])
  const navigate = useNavigate()
  const data = useSelector(state => state.login.data)
  const dispatch = useDispatch()

  
  const goBack = () =>{
    navigate(-1)
  }

  const getAssignedTasks = () =>{
      axios.get(`${API_URL}/api/task/assigned-tasks`, {headers:{
        authorization: `Bearer ${data.refreshToken}`,
        "Content-Type": "application/json"
      }})
      .then((res) => {
        console.log(res.data.data)
        setAssignedTask(res.data.data)
      })
      .catch(err => console.log(err))

  }

  const getCreatedTasks = () =>{
      axios.get(`${API_URL}/api/task/my-tasks`, {headers:{
        authorization: `Bearer ${data.refreshToken}`,
        "Content-Type": "application/json"
      }})
      .then((res) => {
        console.log(res.data.data)
        setCreatedTask(res.data.data)
      })
      .catch(err => console.log(err))

  }

  const getTeam = () =>{
      console.log("Api called for get team from myprofile")
      axios.get(`${API_URL}/api/users/all-users`, {headers:{
        authorization: `Bearer ${data.refreshToken}`,
        "Content-Type": "application/json"
      }})
      .then((res) => {
        setTeam(res.data.data)
      })
      .catch(err => console.log(err))

  }

  useEffect(()=>{
    getAssignedTasks()
    getCreatedTasks()
    getTeam()
  }, [])

  const handleNameEdits = (e) => {
    setReadOnly(true)
    const name = {name: e.target.value}

    axios.post(`${API_URL}/api/users/edit-name`, name, {headers:{
        authorization: `Bearer ${data.refreshToken}`,
        "Content-Type": "application/json"
      }})
      
    .then(res => {
      console.log(res.data.data)
      dispatch(loginUser(res.data.data))
    })
    .catch(err => console.log(err))

  }

  return <>
  {editModel && <EditProfilePopUpModel onClose={() => setEditModel(false)}/>}
  <Header/>
  <div className="flex">
    <Sidebar/>
    <div className="mt-17 w-full h-[40rem]"> 
      <Link onClick={goBack} className="relative top-[1rem] flex"><IoIosArrowBack /> <span className="relative bottom-1">Back</span></Link>
      <div id="myProfilee" className=" flex gap-10 max-h-[40rem] py-5 justify-center mx-2 border border-b-black border-white"> 
        <div onClick={()=> setEditModel(true)} className="pt-3">
          <img className="w-[5rem] h-[5rem] rounded-[50%] border-blue-300 border-2" src={data.avatar ? data.avatar : "../../assests/Avishkar_passportt.jpg"} alt="Emp Avatar" />
        </div>
        <div className="">
          <textarea 
            className="text-3xl my-4 font-bold text-[#071330] resize-none px-1"
            onBlur={(e) => handleNameEdits(e)}
            onFocus={() => setReadOnly(false)}
            readOnly={readOnly}
            // value={data.Name}
          >
            {data.Name ? data.Name : "Example Name"}
          </textarea>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <h3 className="text-1xl border border-b-gray-200 border-white px-2"><span className="font-semibold text-[#0c4160] mr-2">Mail:</span> <span className="text-blue-800">{data.email ? data.email : "example@gmail.com"}</span></h3>
              <h3 className="text-1xl border border-b-gray-200 border-white px-2"><span className="font-semibold text-[#0c4160] mr-2">Empolyee Id:</span> <span className="text-blue-800">{data.empId ? data.empId : "3000"}</span></h3>
              <h3 className="text-1xl border border-b-gray-200 border-white px-2"><span className="font-semibold text-[#0c4160] mr-2">Reporting Manager:</span> <span className="text-blue-800">{data.managerName ? data.managerName : "example"}</span></h3>
              <h3 className="text-1xl border border-b-gray-200 border-white px-2"><span className="font-semibold text-[#0c4160] mr-2">Role:</span> <span className="text-blue-800">{data.role ? data.role : "Admin"}</span></h3>
              <h3 className="text-1xl border border-b-gray-200 border-white px-2"><span className="font-semibold text-[#0c4160] mr-2">Date of Birth:</span> <span className="text-blue-800">{data.dateOfBirth ? data.dateOfBirth : "08-07-2001"}</span></h3>
              <h3 className="text-1xl border border-b-gray-200 border-white px-2"><span className="font-semibold text-[#0c4160] mr-2">Date of Joining:</span> <span className="text-blue-800">{data.dateOfJoining ? data.dateOfJoining : "16-03-2022"}</span></h3>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-evenly mt-5 gap-3">
        <div className="w-full flex flex-col items-center border-r-black border border-white">
          <div className="flex flex-col items-center border-r-black border-white">
            <div className="font-bold mb-3">Assigned Tickets</div>
            {assignedTask.length !== 0 ? assignedTask.map((task)=>{
              return <div className="w-full" key={task._id}>
                <Link 
                      className="text-blue-700 text-sm font-semibold my-2 border px-1 rounded "
                      key={task._id}
                      to={`/tasks/${task._id}`}
                      >
                        {task.title}
                      </Link>
              </div>
            }) : <div className="text-blue-700 text-sm font-semibold my-3">No tickets Assigned to you. </div>}
          </div>
        </div>
        <div className="w-full flex flex-col items-center border-r-black border border-white">
          <div className="flex flex-col items-center border-r-black border-white">
            <div className="font-bold mb-3">Created Tickets</div>
            {createdTask.length !== 0 ? createdTask.map((task)=>{
              return <div className="w-full" key={task._id}>
                <Link 
                      className="text-red-500 text-sm font-semibold my-2 border px-1 rounded "
                      key={task._id}
                      to={`/tasks/${task._id}`}
                      >
                        {task.title}
                      </Link>
              </div>
            }) : <div className="text-red-500 text-sm font-semibold my-3">No tickets Assigned to you. </div>}
          </div>
        </div>
        <div className="w-full flex flex-col items-center ">
          <div className="flex flex-col items-center border-r-black border-white">
            <div className="font-bold mb-3">Team Tree</div>
            {team.length !== 0 ? team.map((team)=>{
              return <div className="w-full" key={team._id}>
                <Link 
                      className="text-yellow-400 text-sm font-semibold my-2 border px-1 rounded "
                      key={team._id}
                      to={`/profile/${team._id}`}
                      >
                        {team.Name}
                      </Link>
              </div>
            }) : <div className="text-yellow-400 text-sm font-semibold my-3">You are One man ARMY. </div>}
          </div>
        </div>
      </div>
      
    </div>
  </div>
  <Footer/>
  </>
}


export default MyProfile;