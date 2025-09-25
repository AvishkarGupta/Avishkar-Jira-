import { useSelector } from "react-redux";
import { Footer, Header, Sidebar } from "../Index";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";

const MyProfile = () => {

  const data = useSelector(state => state.login)
  console.log(data)

  axios.get()
  .then( (res) => {console.log(res)} )
  .catch( (error) => {console.log(error)} )
  
  return <>
  <Header/>
  <div className="flex">
    <Sidebar/>
    <div className="w-[75%] mt-17 pt-[3rem]"> 
      <Link to={"/home"} className="relative bottom-[1rem] left-[1rem] flex"><IoIosArrowBack /> <span className="relative bottom-1">Back to home</span></Link>
    <div id="myProfile" className="flex flex-col gap-3 items-center w-[70%] m-auto py-5"> 
      <div className="">
        <img className="w-[10rem] h-[10rem] rounded-[50%] border-blue-300 border-2" src={data.avatar ? data.avatar : "../../assests/Avishkar_passportt.jpg"} alt="Emp Avatar" />
      </div>
      <div className="">
        <h1 className="text-3xl">{data.Name ? data.Name : "Example Name"}</h1>
      </div>
      <div className="flex justify-between w-[75%]">
        <div className="flex flex-col gap-2">
          <h3 className="text-1xl"><span className="font-semibold">Mail:</span> <span className="text-blue-800">{data.email ? data.email : "example@gmail.com"}</span></h3>
          <h3 className="text-1xl"><span className="font-semibold">Role:</span> <span className="text-blue-800">{data.role ? data.role : "Admin"}</span></h3>
          <h3 className="text-1xl"><span className="font-semibold">Date of Birth:</span> <span className="text-blue-800">{data.dateOfBirth ? data.dateOfBirth : "08-07-2001"}</span></h3>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-1xl"><span className="font-semibold">Empolyee Id:</span> <span className="text-blue-800">{data.empId ? data.empId : "3000"}</span></h3>
          <h3 className="text-1xl"><span className="font-semibold">Reporting Manager:</span> <span className="text-blue-800">{data.managerName ? data.managerName : "example"}</span></h3>
          <h3 className="text-1xl"><span className="font-semibold">Date of Joining:</span> <span className="text-blue-800">{data.dateOfJoining ? data.dateOfJoining : "16-03-2022"}</span></h3>
        </div>
      </div>
      <form className="self-end mr-[4rem]">
        <button className="bg-blue-400 text-white font-semibold p-2 rounded-xl text-[0.7rem]">Edit Profile</button>
      </form>
    </div>

    <div className="m-auto mt-4 py-5">

      <div className="flex flex-col border-2 border-white border-b-gray-500 mb-5 mx-2">
        <div className="m-auto text-[1.5rem] text-gray-700 font-semibold border-b-gray-500 border-white border-2">
          Experience
        </div>
        <div className="ml-[2rem]">
          <div className="text-[1.1rem] mb-4">
            Magic EdTech
          </div>
          <div className="flex justify-between w-[80%] ml-[2rem]">
            <span>Senior Assoicate</span> <span>July-2024 to  June-2025</span>
          </div>
          <div className="flex justify-between w-[80%] ml-[2rem]">
            <span>Assoicate</span> <span>Mar-2022 to July-2024</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-2 border-white border-b-gray-500 mb-5 mx-2">
        <div className="m-auto text-[1.5rem] text-gray-700 font-semibold border-b-gray-500 border-white border-2 ">
          Education
        </div>
        <div className="ml-[2rem]">
          <div className="text-[1.1rem] mb-4">
            High School
          </div>
          <div className="flex justify-between w-[80%] ml-[2rem]">
            <span>Sardar Patel Public School</span> <span>April-2016 to  March-2017</span>
          </div>
          <div className="text-[1.1rem] my-4">
            Graduation
          </div>
          <div className="flex justify-between w-[80%] ml-[2rem]">
            <span>Bachelor of Arts</span> <span>July-2023 to  June-2026</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col border-2 border-white border-b-gray-500 mb-5 mx-2">
        <div className="m-auto text-[1.5rem] text-gray-700 font-semibold border-b-gray-500 border-white border-2 mb-4">
          skills
        </div>
        <div className="ml-[2rem] flex flex-col gap-2 mb-5"> {/* //Store this in an array */}
          <div className="flex justify-between w-[80%] ml-[2rem] bg-gray-200 px-4 rounded-2xl border-1 border-gray-300"><span>MERN Stack</span> <span>Advance</span></div>
          <div className="flex justify-between w-[80%] ml-[2rem] bg-gray-200 px-4 rounded-2xl border-1 border-gray-300"><span>DSA</span> <span>Advance</span></div>
        </div>
      </div>

      <div className="flex flex-col border-2 border-white border-b-gray-500 mb-5 mx-2">
        <div className="m-auto text-[1.5rem] text-gray-700 font-semibold border-b-gray-500 border-white border-2 mb-4">
          Salary Structure
        </div>
        <div className="ml-[2rem] flex flex-col gap-2 mb-5"> {/* //Store this in an array base on FY*/}
          <div className="flex justify-between w-[80%] ml-[2rem] bg-gray-200 px-4 rounded-2xl border-1 border-gray-300"><span>FY-2022-2023 </span> <span>209000</span></div>
          <div className="flex justify-between w-[80%] ml-[2rem] bg-gray-200 px-4 rounded-2xl border-1 border-gray-300"><span>FY-2023-2024 </span> <span>232614</span></div>
          <div className="flex justify-between w-[80%] ml-[2rem] bg-gray-200 px-4 rounded-2xl border-1 border-gray-300"><span>FY-2024-2025 </span> <span>291714</span></div>
        </div>
      </div>

    </div>
  </div>
  </div>
  <Footer/>
  </>
}


export default MyProfile;