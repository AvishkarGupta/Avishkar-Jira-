import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";

const Sidebar = () => {

  const [filters, setFilters] = useState([])
  const token = useSelector(state => state.login.refreshToken)
  const data = useSelector( state => state.login)

  const sidebar = [
    {
      name: "Home",
      URI: "/home",
    },
    {
      name: "Register New User",
      URI: "/register-user",
    },
    {
      name: "My Colleague",
      URI: "/my-colleague",
    },
    {
      name: "Create Task",
      URI: "/create-task",
    },
    {
      name: "All Tasks",
      URI: "/all-tasks",
    },
    {
      name: "Assigned Task",
      URI: "/assigned-tasks",
    },
    {
      name: "Filter",
      URI: "/filter-tasks",
    },
  ]

  const sidebarIfUserIsNotAdmin = [
    {
      name: "Home",
      URI: "/home",
    },
    {
      name: "My Colleague",
      URI: "/my-colleague",
    },
    {
      name: "All Tasks",
      URI: "/all-tasks",
    },
    {
      name: "Assigned Task",
      URI: "/assigned-tasks",
    },
    {
      name: "Filter",
      URI: "/filter-tasks",
    }
  ]

  const getAllFilters = () => {

    axios.get("http://localhost:8000/api/filter/get-filters", {headers:{
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    }})
    .then(res => {
      return setFilters(res.data.data)
    })
    .catch(err => console.log(err))
  }

  useEffect(()=>{
    getAllFilters()
  }, [])

  const newSidebar = [...sidebar, ...filters]
  const newSidebarIfUserIsNotAdmin = [...sidebarIfUserIsNotAdmin,  ...filters]

  const handleDeleteFilter = (e, filterName) =>{
    console.log(e.target, filterName)

    axios.post("http://localhost:8000/api/filter/delete-filter", {filterName}, {headers:{
      authorization: `Bearer ${token}`
    }})
    .then(res => {
      console.log(res)
      return setFilters(res.data.data)
    })
    .catch(err => console.log(err))
  }
  
  return <>
  <div className="text-[1.2rem] mt-17 min-w-[20rem] h-auto border-black flex flex-col bg-[#071330] pt-[0.5rem]">
    {data.role === "admin" ? newSidebar.map( (title) => (
      <div key={title.name} className="px-3 pt-3 mx-2 text-white font-mono font-semibold border-b-1 border-[#f2eeee39] flex gap-4 justify-between">
        <Link  to={title.URI ? title.URI : `/filter-tasks/${title.name}`} className="">{title.name}</Link>
         {!title.URI && <MdOutlineDelete key={title.name} onClick={(e)=>{handleDeleteFilter(e, title.name)}} className="self-end " />}
      </div>
    ) )
    
    :
    newSidebarIfUserIsNotAdmin.map( (title) => (
      <div key={title.name} className="text-[1.2rem] mt-17 min-w-[20rem] h-auto border-black flex flex-col bg-[#071330] pt-[0.5rem]">
        <Link  to={title.URI ? title.URI : `/filter-tasks/${title.name}`} className="">{title.name}</Link>
        {!title.URI && <MdOutlineDelete key={title.name} onClick={(e)=>{handleDeleteFilter(e, title.name)}} className="self-end " />}
      </div>
    ) )
    }
    
    
  </div>
  </>
}

export default Sidebar;