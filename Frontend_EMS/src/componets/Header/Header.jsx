import { Link, NavLink } from "react-router-dom";
import { logoutUser } from "../../store/slice/loginSlice";
import axios from "axios";
import { FaPhoenixFramework } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const Header = ()=>{

  const dispatch = useDispatch()
  const [input, setInput] = useState()
  const [result ,setResult] = useState([])
  const [showResultContainer ,setShowResultContainer] = useState(false)
  const [cache, setCache] = useState({})

  const data = useSelector((state)=> state.login.data)

  const handleLogout = ()=>{
  axios.get(`${API_URL}/api/users/logout`,{
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
  }

  const ifUserNotLoggedInHeaders = [
    {name: "Life at Invention.Io", URI: "/life-at-invention.io"}, 
    {name: "Careers" , URI: "/careers"}, 
    {name: "Contact Us" , URI: "/contact-us"}, 
    {name: "About" , URI: "/about"} 
  ]

  const search = () =>{
    if(cache[input]){
      console.log("Response from cache")
      setResult(cache[input])
      return;
    }
    axios.get(`${API_URL}/api/search/q=${input}`, {headers:{
      authorization: `Bearer ${data.refreshToken}`,
      "Content-Type": "application-json"
    }})
    .then((res) => {
      setResult(res.data.data)
      setCache((prev) => ({...prev, [input]: res.data.data}))
    })
    .catch(err => {
      console.log(err)
      setResult([])
    })
  }

  if (data.refreshToken){
    useEffect(()=>{
    const timer = setTimeout(()=>{
      search()
    }, 400)
    return () =>{
      clearTimeout(timer)
    }
  }, [input])
  }

  return <>
    {data.refreshToken ? 
    <div className="border-b-2 border-amber-400 bg-[#0c4160] flex p-2.5 justify-evenly top-0 fixed w-[100%] z-10 text-white">
      <div className="flex">
        <img className="w-[3rem]  h-[3rem] rounded-[50%] " src={data.avatar ? data.avatar : "../../assests/Avishkar_passport.jpg"} alt="Emp Avatar" />
        <div className="flex flex-col">
          <Link to="/my-profile" className="font-bold text-[1rem] ml-[0.8rem]" key={data.Name ? data.Name : "Avishkar"} >{data.Name ? data.Name : "Avishkar"}</Link>
          <Link to="/my-profile" className="font-semibold text-[0.8rem] self-end " key={data.empId ? data.empId : "***"} >{data.empId ? data.empId : "3000"}</Link>
        </div>
      </div>
      <div className="m-auto">
        <input 
          type="search" 
          name="search" 
          id="search"
          placeholder="Search"
          className="bg-white text-black font-semibold rounded-xl outline-none py-1.5 px-[1.5rem] w-[30rem] placeholder:text-gray-600 placeholder:font-semibold "
          onChange={(e)=> {setInput(e.target.value)}}
          onFocus={()=> setShowResultContainer(true)}
          
        />
        {showResultContainer &&
          <div className="fixed w-[30rem] flex flex-col gap-2 bg-[#0c4160] items-center">
          {result.length !== 0 
        ? 
        result.map((res)=>{
          return <Link to={res.Name ? `/profile/${res._id}` : `/tasks/${res._id}`} className="hover:bg-[#135074] w-full px-5 border-b-white border-2 border-[#0c4160]" key={res._id}>{res.Name || res.title}</Link>
        })
         : ""}
        </div>}
      </div>  
      <div className="flex justify-evenly font-bold text-[1rem] pt-3">
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
            <NavLink className={``} to={`${title.URI}`}  key={title.name} > {title.name} </NavLink>
          ) )}
          <Link to="/login" key="Login">Login</Link>
        </div>
      </div>
    </div>
    }
  </>
}

export default Header;