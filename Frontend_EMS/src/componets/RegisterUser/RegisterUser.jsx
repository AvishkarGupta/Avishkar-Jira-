import axios from "axios";
import Header from "../Header/Header";
import { useRef } from "react";
import { useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;

const RegisterUser = ()=>{

  const [db_Response, setDb_Response] = useState("")

  const empIdRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const dateOfBirthRef = useRef();
  const dateOfJoiningRef = useRef();
  const roleRef = useRef();
  const avatarRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("empId", empIdRef.current.value);
      data.append("firstName", firstNameRef.current.value);
      data.append("lastName", lastNameRef.current.value);
      data.append("email", emailRef.current.value);
      data.append("password", passwordRef.current.value);
      data.append("dateOfBirth", dateOfBirthRef.current.value);
      data.append("dateOfJoining", dateOfJoiningRef.current.value);
      data.append("role", roleRef.current.value);
      
      if (avatarRef.current.files[0]) {
        data.append("avatar", avatarRef.current.files[0]);
      }
      let emp = empIdRef.current.value
      let fn = firstNameRef.current.value
      let ln = lastNameRef.current.value
      let mail = emailRef.current.value
      let pw = passwordRef.current.value
      let dob = dateOfBirthRef.current.value
      let doj = dateOfJoiningRef.current.value
      let role = roleRef.current.value

      if ([emp, fn, ln, mail, pw, dob, doj, role].some((field)=> field === "" || undefined)){
        console.log([emp, fn, ln, mail, pw, dob, doj, role])
        setDb_Response("All fileds are required")
      }else{
        console.log([emp, fn, ln, mail, pw, dob, doj, role])
        const res = await axios.post(`${API_URL}/users/register`, data);
        
        console.log("User registered:", res.data.message);
        setDb_Response(res.data.message)
        
        empIdRef.current.value = ""
        firstNameRef.current.value = ""
        emailRef.current.value = ""
        passwordRef.current.value = ""
        dateOfBirthRef.current.value = ""
        dateOfJoiningRef.current.value = ""
        roleRef.current.value = ""
      }

    } catch (error) {
      console.error("Error registering user:", error.response?.data || error.message);
    }
  };

  return <>
  <div id="opacity" className="bg-[rgba(103,150,237,0.1)] h-screen ">
  <Header/>
  <div className="my-5 flex flex-col items-center">
    <h2 id="RegisterUserHeadLine" className="text-3xl text-amber-800 mb-5">Add new new Joinee Details</h2>
    <form>
      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">Empolyee ID</h3>
      <input ref={empIdRef} placeholder="Emp Id" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="text"  required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">First Name</h3>
      <input placeholder="First Name" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="text" ref={firstNameRef} required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">Last Name</h3>
      <input placeholder="Last Name" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="text" ref={lastNameRef} required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">E-mail</h3>
      <input placeholder="Email" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="email" ref={emailRef} required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">Password</h3>
      <input placeholder="Password" autoComplete="off" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="password" ref={passwordRef} required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">DOB</h3>
      <input id="inputfile" placeholder="Date Of Birth" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="date" ref={dateOfBirthRef} required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">DOJ</h3>
      <input id="inputfileb" placeholder="Date Of Joining" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="date" ref={dateOfJoiningRef} required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">Avatar</h3>
      <input id="inputfiled" placeholder="upload Image" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="file" ref={avatarRef} required/>
      </div>

      <div className="flex my-3 justify-between">
      <h3 className="font-medium text-[1.3rem]">Designation</h3>
      <input placeholder="Role" className="bg-white px-3 ml-10 outline-none border-2 border-amber-300 rounded-lg py-0.5 w-[25vw]" type="text" ref={roleRef} required/>
      </div>

      <div className="flex justify-center">
        <button onClick={handleSubmit} className="bg-blue-950 px-4 py-2 mt-5 rounded-lg">Submit Details</button></div>
    </form>
    <p id="response_message" className="text-red-500 mt-5 text-sm font-medium rounded ">{db_Response} </p>
  </div>  
  </div>
  </>
}

export default RegisterUser;