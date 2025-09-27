import { Link } from "react-router-dom";
import { logoutUser } from "../../store/slice/loginSlice";
import axios from "axios";
import { FaPhoenixFramework } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';

const Header = ()=>{

  const dispatch = useDispatch()

  const data = useSelector((state)=> state.login)

  const handleLogout = ()=>{
  axios.get('http://localhost:8000/api/users/logout',{
    headers: {
      authorization: `Bearer ${data.refreshToken}`,
      "Content-Type": "application/json"
    }
  })
  .then((resolve)=>{
    Cookies.remove("RefershToken")
    dispatch(logoutUser())
  })
  .catch((error)=>{
    console.log(error)
  })
  .finally(() =>{
    Cookies.remove("RefershToken")
    dispatch(logoutUser())
  }) 
  }

  // useEffect(()=>{
    
  // }, [])

  const handleSearch = (e)=>{
    e.preventDefault()  
  }

  const ifUserNotLoggedInHeaders = [
    {name: "Life at Invention.Io", URI: "/life-at-invention.io"}, 
    {name: "Careers" , URI: "/careers"}, 
    {name: "Contact Us" , URI: "/contact-us"}, 
    {name: "About" , URI: "/about"} 
  ]

  return <>
    {data.isUserLoggedIn ? 
    <div className="border-b-2 border-amber-400 bg-[#0c4160] flex p-2.5 top-0 fixed w-[100%] z-10 text-white">
      <div className="flex ml-[1rem]">
        <img className="w-[3rem]  h-[3rem] rounded-[50%] " src={data.avatar ? data.avatar : "../../assests/Avishkar_passport.jpg"} alt="Emp Avatar" />
        <div className="flex flex-col">
          <Link to="/my-profile" className="font-bold text-[1rem] ml-[0.8rem]" key={data.Name ? data.Name : "Avishkar"} >{data.Name ? data.Name : "Avishkar"}</Link>
          <Link to="/my-profile" className="font-semibold text-[0.8rem] self-end " key={data.empId ? data.empId : "***"} >{data.empId ? data.empId : "3000"}</Link>
        </div>
      </div>
      <div className="flex  mx-auto">
        <form className="my-auto" onClick={handleSearch}>
        <input 
          type="search" 
          name="search" 
          id="search"
          placeholder="Search"
          className="bg-white outline-none rounded-2xl py-1.5 px-[1.5rem] placeholder:text-gray-600 placeholder:font-semibold " 
        />
      </form>
      </div>  
      <div className="flex justify-evenly font-bold text-[1rem] mr-[1rem]">
          {/* {data.role === "admin" ? <Link onClick={handleLogout} to="/admin" key="swithToAdmin">Switch to admin</Link>: ""} */}
          <div className="relative right-[0%]">
          <Link onClick={handleLogout} to="/" key="LogOut">Log Out</Link>
          </div>
      </div>
    </div> 
    :
    <div className="border-b-2 border-amber-400  p-4 bg-[#0c4160] flex justify-between gap-2 top-0 fixed w-[100%] z-10 text-white">
      <div  className="w-1/6 m-auto pl-[3rem] text-4xl">
        <FaPhoenixFramework />
      </div>
      <div className="w-5/6">
        <div className="flex justify-end gap-10 font-bold text-[1rem] mr-[1rem]">
          {ifUserNotLoggedInHeaders.map( (title)=> (
            <Link to={`${title.URI}`}  key={title.name} >{title.name} </Link>
          ) )}
          <Link to="/login" key="Login">Login</Link>
        </div>
      </div>
    </div>
    }
  </>
}

export default Header;