import { useSelector } from "react-redux";

const ProfileCard = ( {data}) =>{

  return <>
  {data.map( (profile)=>{
    return <div key={profile._id} id="teamProfile" className="flex flex-col gap-3 items-center w-[30%] max-w-[400px] max-h-[500px] py-5 bg-amber-500"> 
        <div className="">
          <img className="w-[8rem] h-[8rem] rounded-[50%] border-gray-600 border-2" src={profile.avatar ? profile.avatar : "../../assests/Avishkar_passport.jpg"} alt="Emp Avatar" />
        </div>
        <div className="">
          <h1 className="text-2xl text-[#05445e]  font-bold">{profile.Name ? profile.Name : "Example Name"}</h1>
        </div>
        <div className="flex justify-between w-[75%]">
          <div className="flex flex-col gap-2">
            <h3 className="text-1xl"><span className="font-semibold text-[#05445e] ">Mail:</span> <span className="text-blue-800">{profile.email ? profile.email : "example@gmail.com"}</span></h3>
            <h3 className="text-1xl"><span className="font-semibold text-[#05445e] ">Role:</span> <span className="text-blue-800">{profile.role ? profile.role : "Admin"}</span></h3>
            <h3 className="text-1xl"><span className="font-semibold text-[#05445e] ">Empolyee Id:</span> <span className="text-blue-800">{profile.empId ? profile.empId : "3000"}</span></h3>
            <h3 className="text-1xl"><span className="font-semibold text-[#05445e] ">Reporting Manager:</span> <span className="text-blue-800">{profile.managerName ? profile.managerName : "example"}</span></h3>
          </div>
        </div>
      </div>
  } )}
  </>
}

export default ProfileCard;