import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const MainScreen = () => {

  const token = useSelector(state => state.login.data)
  // const allTask = useSelector(state => state.allTask.data)
  const dispatch = useDispatch()
  const [allTask, setAllTask] = useState([])
  const [assignedTasks, setAssignedTasks] = useState([])
  const [createdTasks, setCreatedTasks] = useState([])
  const [blockerTasks, setBlockerTasks] = useState([])

  const handleAllTaskData = () =>{
    axios.get("http://localhost:8000/api/task/all-tasks", {
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
    axios.get("http://localhost:8000/api/task/assigned-tasks", {
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

    axios.post("http://localhost:8000/api/task/filterd-tasks", filterData, {
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

    axios.post("http://localhost:8000/api/task/filterd-tasks", filterData, {
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
    console.log("Function called")
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
          }) : "Getting your tasks..." }
        </div>
      </div>
      <div className="flex flex-col items-center  min-w-[30rem] max-w-[30rem] max-h-[30rem] rounded border-green-600 border-2">
        <div className="bg-green-600 text-white font-semibold px-2 py-1 w-full">
          Assigned Tickets
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          {assignedTasks.length !== 0 ? assignedTasks.map((task)=>{
            return <Link to={`/tasks/${task._id}`} className="max-h-6 overflow-hidden border-b-green-600 border border-white px-1 bg-green-100 rounded hover:bg-green-200" key={task._id}>{task.title}</Link>
          }) : "Getting your tasks..." }
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
          }) : "Getting your tasks..." }
        </div>
      </div>
      <div className="flex flex-col items-center  min-w-[30rem] max-w-[30rem] max-h-[30rem] rounded border-red-600 border-2">
        <div className="bg-red-600 text-white font-semibold px-2 py-1 w-full">
          Blockers Tickets
        </div>
        <div className="flex flex-col gap-1 p-2 w-full">
          {blockerTasks.length !== 0 ? blockerTasks.map((task)=>{
            return <Link to={`/tasks/${task._id}`} className="max-h-6 overflow-hidden border-b-red-600 border border-white px-1 bg-red-100 rounded hover:bg-red-200" key={task._id}>{task.title}</Link>
          }) : "Getting your tasks..." }
        </div>
      </div>
      </div>
    </div>

  </div>
}

export default MainScreen;



// <div className="mt-17 w-[75%] p-3">
//     <div className="flex">
//       <div  className="m-4 w-full">
//         <div className="flex flex-col items-center border-2 rounded-2xl gap-2 bg-gray-400 p-3">
//           <div className="w-full ">
//             <div className="border-b-2 border-white mx-2">
//               <h2 className="mx-[48%] my-1.5 font-bold">Inbox</h2>
//             </div>
//             <div className="flex border-b-2 border-white mx-2 pl-3 pt-1 gap-3 items-center" >
//               <h2 className="mr-3 w-[12%]">from: Boxton</h2>
//               <IoIosMail className=""/>
//               <RiDeleteBin6Fill />
//               <p className="ml-5">Project Update: Timeline and Next Steps</p>
//             </ div>
//             <div className="flex border-b-2 border-white mx-2 pl-3 pt-1 gap-3 items-center" >
//               <h2 className="mr-3 w-[12%]">from: Eve</h2>
//               <IoIosMail className=""/>
//               <RiDeleteBin6Fill />
//               <p className="ml-5">Meeting Reminder: Tomorrow at 10 AM</p>
//             </div>
//             <div className="flex border-b-2 border-white mx-2 pl-3 pt-1 gap-3 items-center" >
//               <h2 className="mr-3 w-[12%]">from: Tony Stark</h2>
//               <IoIosMail className=""/>
//               <RiDeleteBin6Fill />
//               <p className="ml-5">Feedback Request: Draft Report Review</p>
//             </div>
//             <div className="flex border-b-2 border-white mx-2 pl-3 pt-1 gap-3 items-center" >
//               <h2 className="mr-3 w-[12%]">from: God</h2>
//               <IoIosMail className=""/>
//               <RiDeleteBin6Fill />
//               <p className="ml-5">Action Required: Complete Your Profile</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="m-4 border-2 w-full rounded-2xl">
//         <div>
//           <div className="flex justify-center bg-amber-100 rounded-t-2xl mb-2">
//               <h2 className="my-1.5 font-bold ">HUB</h2>
//           </div>
//           <div className="flex justify-evenly border-b-2 border-white mx-2 g-2">
//             <div id="newsletter" className="w-[49%] max-h-60 overflow-y-scroll bg-[rgba(8,122,157,0.2)] rounded-2xl">
//               <div className="bg-[rgb(8,122,157)] text-white font-bold pl-[40%]">My Apps</div>
//               <ul className="mt-2 px-4 py-1 font-semibold">
//                 <li className="border-b-2 border-[rgb(255,255,255)] mt-3">My Folder</li>
//                 <li className="border-b-2 border-[rgb(255,255,255)] mt-3">Recording</li>
//                 <li className="border-b-2 border-[rgb(255,255,255)] mt-3">Meta Data</li>
//                 <li className="border-b-2 border-[rgb(255,255,255)] mt-3">Smart Sheets</li>
//                 <li className="border-b-2 border-[rgb(255,255,255)] mt-3">POC</li>
//                 <li className="border-b-2 border-[rgb(255,255,255)] mt-3">Audit data</li>
//               </ul>
//             </div>
//             <div id="newsletter" className="w-[49%] max-h-60 overflow-y-scroll bg-[rgba(236,136,231,0.24)] rounded-2xl" >
//               <div className="bg-[rgb(157,8,149)] text-white font-bold  pl-[40%]">News Paper</div>
//               <div className="m-2 px-4 py-1 font-semibold border-[rgb(157,8,149)] border-2 rounded-2xl">
//                 <h3 className="font-semibold">Montly Update</h3>
//                 <p className="font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                 </p>
//               </div>
//               <div className="m-2 px-4 py-1 font-semibold border-[rgb(157,8,149)] border-2 rounded-2xl mb-2">
//                 <h3 className="font-semibold">Montly Update</h3>
//                 <p className="font-medium">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Lorem ipsum dolor sit amet consectetur, adipisicing elit.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>



//     {/* #3 */}
//     <div className="mt-[2rem] bg-[#78c5e632] border-[0.01rem] border-[#13aaeb9d]">
//       <h2 className="ml-[2rem] font-bold text-2xl text-blue-900">Leaves Tracker</h2>
//       <div className="w-full flex justify-evenly items-end pt-[1rem]">
//         <div className="flex flex-col items-center">
//           <p className="">5</p>
//           <p className="">4</p>
//           <p className="">3</p>
//           <p className="">2</p>
//           <p className="">1</p>
//           <p className="">Leaves</p>
//         </div>
//         <div>
//           <div className="w-[2rem] h-[5rem] bg-blue-400"></div>
//           <h2>March</h2>
//           </div>
//         <div>
//           <div className="w-[2rem] h-[1rem] bg-blue-300"></div>
//           <h2>April</h2>
//           </div>
//         <div>
//           <div className="w-[2rem] h-[3rem] bg-blue-400"></div>
//           <h2>june</h2>
//           </div>
//         <div>
//           <div className="w-[2rem] h-[1rem] bg-blue-300"></div>
//           <h2>July</h2>
//           </div>
//         <div>
//           <div className="w-[2rem] h-[7rem] bg-blue-600"></div>
//           <h2>August</h2>
//           </div>

//       </div>
//     </div>

    

//   </div>