import React, { useRef, useState } from "react";
import axios from "axios"
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/slice/loginSlice.js";
import { Link } from "react-router-dom";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

const Login = ()=>{

  const [error, setError] = useState(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const emailVal = useRef()
  const passwordVal = useRef()

  const handelform = (e)=>{
    e.preventDefault()

    let email = emailVal.current.value
    let password = passwordVal.current.value

    axios({method: 'post', url: 'http://localhost:8000/api/users/login', data: {email, password}})
    .then((resolve)=> {
      console.log(resolve)
      Cookies.set("RefershToken", resolve.data.data.refreshToken)
      dispatch(loginUser(resolve.data.data))
      setTimeout(()=>{
        navigate('/home')
      }, 500)
    })
    .catch((error)=> {
      if (error){
        console.log(error)
        console.log("Avishkar error")
        setError("Invaid credentials")
        Cookies.remove("RefershToken")
      }
    })
    .finally(()=> console.log("Request sent"))
  }

  return (
  <div className="flex flex-col justify-center bg-[#d8e8fa] items-center h-screen w-screen">
    <div className="flex flex-col justify-center items-center mb-5">
      <h1 className="text-3xl text-[#071330] font-bold">Employee Tracking login</h1>
    </div>
    <div id="loginDiv" className="bg-white flex flex-col items-center border-2 w-fit border-[#071330] rounded-xl p-3 pt-30 pb-10">
      <form
      onSubmit={(e)=>(handelform(e))} 
      className="flex flex-col justify-center items-center"
      >
        <input id="logininput1" 
        ref={emailVal} 
        required 
        className="px-10 py-1 border-b-2 border-[#071330] outline-none placeholder:italic" 
        type="email" 
        autoComplete="email" 
        placeholder="Enter your email"
        autoFocus 
        />
        <input id="logininput2" 
        ref={passwordVal} 
        required 
        className="m-10 px-10 py-1 border-b-2 border-[#071330] outline-none placeholder:italic" 
        type="password" 
        autoComplete="password" 
        placeholder="Enter your password" 
        />
        <button className="px-10 py-2 border-b-2 border-[#071330] outline-none bg-[#0c4160] text-white rounded-4xl font-medium shadow-fuchsia-600 ">Log in</button>
      </form>
      <p className="text-red-500 font-semibold text-sm mt-2">{error} </p>
      <p id="logintext" className="mt-10 ">Don't have an account yet?</p>
      <Link to="/forget-password" id="forget_password" className="text-blue-700 font-semibold">Forget Password</Link>
    </div>
  </div>
  )
}

export default Login;