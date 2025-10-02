import { Link } from "react-router-dom";
import { Sidebar, Header, Footer, ProfileCard } from "../Index";
import { IoIosArrowBack } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { team } from "../../store/slice/teamSlice";
const API_URL = import.meta.env.VITE_API_URL;


const MyColleague = () => {

  const token = useSelector(state => state.login.data)
  const data = useSelector(state => state.teamProfile)
  const dispatch = useDispatch()


  const handleTeamData = ()=>{
    axios.get(`${API_URL}/api/users/all-users`, {headers:{
      authorization: `Bearer ${token.refreshToken}`
    }})
    .then((res)=>{
      console.log(res)
      dispatch(team(res.data.data))
    })
    .catch((err)=>{console.log(err)})
  }

  useEffect( ()=>{
    handleTeamData()
  }, [] )

  return <div className="overflow-y-scroll h-screen max-h-[100rem]">
          <Header/>
          <div className="flex "> 
            <Sidebar/>
            <div className="relative mt-17 w-[80%]">
              <div className="flex">
                <Link to={"/home"} className="bottom-[-1rem] left-[1rem] relative flex"><IoIosArrowBack /> <span className="relative bottom-1">Back to home</span></Link>
                <h1 className=" m-auto pr-[6rem] font-bold text-3xl py-[2rem] text-red-600 text-shadow-fuchsia-300 text-shadow-lg">Say Hi! To your Colleague</h1>
              </div>
              <div id="myColleague" className="flex flex-wrap justify-evenly gap-5 bg-[#d4f1f4] h-screen max-h-[800px] overflow-y-scroll m-[1rem] rounded-2xl p-[1rem]">
                <ProfileCard data={data.data}/>
              </div>
            </div>
          </div>
          <Footer/>
        </div>

}

export default MyColleague;