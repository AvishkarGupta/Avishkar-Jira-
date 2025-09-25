import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const data = useSelector( state => state.login)

  const sidebar = [
    {
      name: "Home",
      URI: "/home",
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
      name: "Assigned Tasks",
      URI: "/assigned-tasks",
    },
    {
      name: "Filter",
      URI: "/filter-tasks",
    },
    {
      name: "My Colleague",
      URI: "/my-colleague",
    },
    {
      name: "KRA",
      URI: "/my-kra",
    },
    {
      name: "Time Sheet",
      URI: "/time-sheet",
    },
    {
      name: "Create New Employee Account",
      URI: "/register-user",
    },
    {
      name: "We are Hiring",
      URI: "/we-are-hiring",
    },

  ]

  const sidebarIfUserIsNotAdmin = [
    {
      name: "Home",
      URI: "/home",
    },
    {
      name: "All Tasks",
      URI: "/all-tasks",
    },
    {
      name: "Assigned Tasks",
      URI: "/assigned-tasks",
    },
    {
      name: "Filter",
      URI: "/filter-tasks",
    },
    {
      name: "My Colleague",
      URI: "/my-colleague",
    },
    {
      name: "KRA",
      URI: "/my-kra",
    },
    {
      name: "My Time-Sheet",
      URI: "/time-sheet",
    },
    {
      name: "We are Hiring",
      URI: "/we-are-hiring",
    },

  ]
  
  return <>
  <div className="text-[1.2rem] mt-17 w-[20%] h-auto border-black flex flex-col bg-[rgba(136,136,235,0.15)] pt-[0.5rem]">
    {data.role === "admin" ? sidebar.map( (titel) => (
      <Link key={titel.name} to={titel.URI} className="px-3 pt-3 mx-2 text-[rgba(14,13,22,0.82)] font-mono font-semibold border-b-1 border-[#cd462e39]">{titel.name}</Link>
    ) )
    :
    sidebarIfUserIsNotAdmin.map( (titel) => (
      <Link key={titel.name} to={titel.URI} className="px-3 pt-3 mx-2 text-[rgba(14,13,22,0.82)] font-mono font-semibold border-b-1 border-[#cd462e39]">{titel.name}</Link>
    ) )
    }
    
  </div>
  </>
}

export default Sidebar;