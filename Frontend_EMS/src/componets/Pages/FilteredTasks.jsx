import { Link, useNavigate } from "react-router-dom";
import { Footer, Header, Sidebar } from "../Index";
import { IoIosArrowBack } from "react-icons/io";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useState } from "react";
import { addfilter, clearState, storeData } from "../../store/slice/filterSlice";
import { team } from "../../store/slice/teamSlice";
import FilteredTaskBoilerPlate from "./FilterdTaskBoilerPlate";
import SaveFilterModel from "./SaveFilterModel";

const FilterTasks = ( ) => {

  const [showModel, setShowModel] = useState(false)
  const dispatch = useDispatch()
  const token = useSelector(state => state.login.data)
  const user = useSelector(state => state.teamProfile)
  const data = useSelector(state => state.filterQuery)
  const filter = useSelector(state => state.filterQuery)
  const priority = ["Low", "Medium", "High", "Blocker"]
  const category = ["QA", "Development", "Debugging", "UI and UX"]
  const status = ["New", "To do", "In Progress", "In Verification", "RFV", "Resolved", "Closed", "Re Opened"]

  // filter Logic
  const [filters, setFilters] = useState({
    owner: "NA",
    assignee: "NA",
    priority: "NA",
    category: "NA",
    status: "NA",
    name: ""
  });

  const handleFilter = (e) => {
    console.log(e.target)
    const { name, value, id, className } = e.target;
    console.log(name, value, id, className)
     setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = () =>{
    dispatch(addfilter(filters))
    getTasks(filters)
  }

  const handleClear = () => {
    console.log("Handle clear")
    setFilters({
    owner: "NA",
    assignee: "NA",
    priority: "NA",
    category: "NA",
    status: "NA",
    name: ""
  })
    dispatch(clearState({
    owner: "NA",
    assignee: "NA",
    priority: "NA",
    category: "NA",
    status: "NA",
    name: ""
  })) 
  getTasks({
    owner: "NA",
    assignee: "NA",
    priority: "NA",
    category: "NA",
    status: "NA",
  })
}
  // get filterd tasks
  const getTasks = (filterData)=>{

    axios.post("http://localhost:8000/api/task/filterd-tasks", filterData, {
    headers:{
      authorization: `Bearer ${token.refreshToken}`,
      "Content-Type": "application/json"
    }})
    .then( (res) => {
      dispatch(storeData(res.data.data))
    })
    .catch( (err) => console.log(err) )
  }

  //get all uesr
  const getUserInfo = () => {

    axios.get("http://localhost:8000/api/users/all-users", {
    headers: {
      authorization: `Bearer ${token.refreshToken}`,
      "Content-Type": "application/json"
    }})
    .then((res)=>{
      dispatch(team(res.data.data))
    })
    .catch((err)=> console.log(err))
  }
 
  useEffect( ()=>{
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
        </div>
        <div id="filter" className="bg-gray-100 rounded m-[1rem] flex justify-evenly flex-wrap">
          <div className="mx-[1rem] my-[1rem] bg-violet-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            Owner: 
            <select 
              onChange={(e)=>{handleFilter(e)}}
              className="outline-none bg-none" 
              name="owner" 
              id="owner"
            >
            <option className="text-violet-700 font-semibold bg-transparent" value={filter?.filter?.owner}>{filter?.filter?.owner}</option>
            {user.data 
              ? 
              user?.data?.map((user)=>{
              return <option className="text-violet-700 font-semibold bg-transparent" value={user?.Name} key={user?.Name}>{user?.Name}</option>})
              : 
              ""
            }
            </select>
          </div>
          <div className="mx-[1rem] my-[1rem] bg-blue-400 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            Assignee: 
            <select
              onChange={(e)=>{handleFilter(e)}} 
              className="outline-none bg-none" 
              name="assignee" 
              id="assignee"
            >
            <option className="text-blue-400 font-semibold bg-transparent" value={filter?.filter?.assignee}>{filter?.filter?.assignee}</option>
            {user.data
              ? 
              user?.data?.map((user)=>{
              return <option className="text-blue-400 font-semibold bg-transparent" value={user?.Name} key={user?.Name}>{user?.Name}</option>})
              : 
              ""
            }
            </select>
          </div>
          <div className="mx-[1rem] my-[1rem] bg-red-500 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            Priority: 
            <select 
              onChange={(e)=>{handleFilter(e)}}
              className="outline-none bg-none" 
              name="priority" 
              id="priority"
            >
            <option className="text-red-500 font-semibold bg-transparent" value={filter?.filter?.priority}>{filter?.filter?.priority}</option>
            {priority 
              ? 
              priority?.map((priority)=>{
              return <option className="text-red-500 font-semibold bg-transparent" value={priority} key={priority}>{priority}</option>})
              : 
              ""
            }
            </select>
          </div>
          <div className="mx-[1rem] my-[1rem] bg-yellow-400 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            Category: 
            <select 
              onChange={(e)=>{handleFilter(e)}}
              className="outline-none bg-none" 
              name="category" 
              id="category"
            >
            <option className="text-yellow-400 font-semibold bg-transparent" value={filter?.filter?.category}>{filter?.filter?.category}</option>
            {category 
              ? 
              category?.map((category)=>{
              return <option className="text-yellow-400 font-semibold bg-transparent" value={category} key={category}>{category}</option>})
              : 
              ""
            }
            </select>
          </div>
          <div className="mx-[1rem] my-[1rem] bg-green-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
            Status: 
            <select 
              onChange={(e)=>{handleFilter(e)}}
              className="outline-none bg-none" 
              name="status" 
              id="status"
            >
            <option className="text-green-700 font-semibold bg-transparent" value={filter?.filter?.status}>{filter?.filter?.status}</option>
            {status 
              ? 
              status?.map((status)=>{
              return <option className="text-green-700 font-semibold bg-transparent" value={status} key={status}>{status}</option>})
              : 
              ""
            }
            </select>
          </div>
          <div>
            <button onClick={handleClear} className="mx-[1rem] my-[1rem] bg-fuchsia-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
              Clear
            </button>
          </div>
          <div>
            <button onClick={handleSearch} className="mx-[1rem] my-[1rem] bg-orange-700 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">
              Filter
            </button>
          </div>
        </div>
        <div className="flex justify-end m-[1rem]">
          <button onClick={()=>{setShowModel(true)}} className="mx-[1rem] bg-green-400 text-white font-semibold px-2 py-1 rounded-xl text-[0.8rem]">Save Filter</button>
        </div>
        {showModel && <SaveFilterModel onClose={()=>{setShowModel(false)}} />}
        <div id="taskDiv" className=" flex flex-wrap justify-evenly overflow-y-scroll max-h-[50rem]">
          <FilteredTaskBoilerPlate data={data.data}/> 
        </div>
      </div>
    </div>
    <Footer/>
  </div>
}

export default FilterTasks;