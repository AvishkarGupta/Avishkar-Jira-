import { useRef, useState } from "react";
import {Footer, Header} from "../Index.js"
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

const CreateNewUser = ( ) => {
  
  const [created, setCreated] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate();

  const data = useSelector(state => state.login)

  const NameValue = useRef()
  const empIdValue = useRef()
  const firstNameValue = useRef()
  const lastNameValue = useRef()
  const emailValue = useRef()
  const passwordValue = useRef()
  const dateOfBirthValue = useRef()
  const dateOfJoiningValue = useRef()
  const roleValue = useRef()
  const reportesToValue = useRef()
  const avatarValue = useRef()

  const handlecreateUser = (e) =>{
    e.preventDefault()
    const Name = NameValue.current.value
    const empId = empIdValue.current.value
    const firstName = firstNameValue.current.value
    const lastName = lastNameValue.current.value
    const email = emailValue.current.value
    const password = passwordValue.current.value
    const role = roleValue.current.value
    const reportesTo = reportesToValue.current.value
    const dateOfJoining = dateOfJoiningValue.current.value
    const dateOfBirth = dateOfBirthValue.current.value
    const avatar = avatarValue.current.files[0]
     
    console.log(
        Name,
        empId,
        firstName,
        lastName,
        email,
        password,
        dateOfBirth,
        dateOfJoining,
        role,
        reportesTo,
        avatar
      )

      const formdata = new FormData()
        formdata.append("Name", Name)
        formdata.append("empId", empId)
        formdata.append("firstName", firstName)
        formdata.append("lastName", lastName)
        formdata.append("email", email)
        formdata.append("password", password)
        formdata.append("dateOfBirth", dateOfBirth)
        formdata.append("dateOfJoining", dateOfJoining)
        formdata.append("role", role)
        formdata.append("reportesTo", reportesTo)
        formdata.append("avatar", avatar)

    // axios({
    //   method:"post", 
    //   url: "http://localhost:8000/api/users/register",
    //   headers: {
    //   authorization: `Bearer ${data.refreshToken}`,
    //   "Content-Type": "application/json"
    // }}, 
    //   formdata)
    axios.post(
    "http://localhost:8000/api/users/register",
    formdata,
    {
      headers: {
        authorization: `Bearer ${data.refreshToken}`,
        "Content-Type": "multipart/form-data",
      }}
    )
    .then((res) => {
      console.log(res.data.message)
      setCreated(res.data.message)
      setTimeout(()=>{
        navigate("/home")
      }, 500)
    }
    )
    .catch(err => {
      console.log(err)
      setError("Something Went wrong while creating new user account!")
    })
    
  }
  
  return <>
  <Header/>
  <div className="relative top-17 rounded py-2 px-10 flex flex-col mb-[2rem]">
    <Link to={"/home"} className="relative  top-[2rem] flex"><IoIosArrowBack /> <span className="relative bottom-1">Back to home</span></Link>
    <h2 className="m-auto font-bold text-3xl text-[rgb(48,27,241)] p-3 mb-3">Set up New colleague Account</h2>
    <div className={`text-red-600 font-bold mb-2`}>{error}</div>
    <div className={`text-green-600 font-bold mb-2`}>{created}</div>
    <form id="CreateNewUser" onSubmit={handlecreateUser} className="m-auto w-[100%] flex justify-center">
      <div className="w-[80%] flex flex-col items-center">
          <div className="flex w-full justify-around">
          <div className="pb-5 flex flex-col">
            <label htmlFor="Name" className="pb-1 font-semibold">Full Name</label>
            <input
              ref={NameValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="text" 
              name="Name"
              placeholder="Bob Stark" 
              id="Name"
              required
            />
          </div>
          <div className="pb-5 flex flex-col ">
            <label htmlFor="empId" className="pb-1 font-semibold">EMP ID</label>
            <input
              ref={empIdValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="text" 
              name="empId" 
              placeholder="####" 
              id="empId"
              required
            />
          </div>
          </div>
          <div className="flex w-full justify-around">
          <div className="pb-5 flex flex-col ">
            <label htmlFor="firstName" className="pb-1 font-semibold">First Name</label>
            <input
              ref={firstNameValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="text"  
              name="firstName"
              placeholder="Bob "
              id="firstName"
              required
            />
          </div>
          <div className="pb-5 flex flex-col ">
            <label htmlFor="lastName" className="pb-1 font-semibold">Last Name</label>
            <input
              ref={lastNameValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300" 
              type="text"  
              name="lastName"
              placeholder="Stark"
              id="lastName"
              required
            />
          </div>
          </div>
          <div className="flex w-full justify-around">
          <div className="pb-5 flex flex-col ">
            <label htmlFor="email" className="pb-1 font-semibold">E-mail (Organization Domain) </label>
            <input
              ref={emailValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="email" 
              name="email" 
              placeholder="example@gmail.com" 
              id="email"
              autoComplete="email"
              required
            />
          </div>
          <div className="pb-5 flex flex-col ">
            <label htmlFor="password" className="pb-1 font-semibold">Password</label>
            <input
              ref={passwordValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="password" 
              name="password" 
              placeholder="****" 
              id="password"
              autoComplete="current-password"
              required
            />
          </div>
          </div>
          <div className="flex w-full justify-around">
          <div className="pb-5 flex flex-col ">
            <label htmlFor="role" className="pb-1 font-semibold">Role </label>
            <input
              ref={roleValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="text" 
              name="role" 
              placeholder="Intern" 
              id="role"
              required
            />
          </div>
          <div className="pb-5 flex flex-col ">
            <label htmlFor="reportesTo" className="pb-1 font-semibold">Reportes To</label>
            <input
              ref={reportesToValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="text" 
              name="reportesTo" 
              placeholder="Eve Pots" 
              id="reportesTo"
              required
            />
          </div>
          </div>
          <div className="flex w-full justify-around">
          <div className="pb-5 flex flex-col ">
            <label htmlFor="DOB" className="pb-1 font-semibold">Date of Birth</label>
            <input
              ref={dateOfBirthValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="date" 
              name="DOB" 
              placeholder="DOB"
              id="DOB"
              required
            />
          </div>
          <div className="pb-5  flex flex-col ">
            <label htmlFor="DOJ" className="pb-1 font-semibold">Date of Joining</label>
            <input
              ref={dateOfJoiningValue} 
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              type="date" 
              name="DOJ"
              placeholder="DOJ"
              id="DOJ"
              required
            />
          </div>
          </div>
          <div className="flex flex-col ">
            <label htmlFor="avatar" className="pb-1 font-semibold">Profile Avatar</label>
            <input 
              ref={avatarValue}
              className="border-b-1 border-gray-200 w-[20vw] rounded outline-none px-2 p-0.4 placeholder-blue-300 " 
              name="avatar" 
              type="file" 
              placeholder="Avatar"
              id="avatar" 
              required
            />
          </div>
          <button className="font-semibold mt-4 py-2 px-10 self-center w-[15vw] rounded bg-blue-400 shadow-blue-300 shadow-lg">Create Account</button>
        </div>
      </form>
  </div>

    <Footer/>
  </>
}

export default CreateNewUser;