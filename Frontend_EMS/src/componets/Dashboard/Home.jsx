import { useSelector } from "react-redux";
import {Header, Sidebar, MainScreen, Footer} from "../Index.js";

const Home = ()=>{

  const data = useSelector(state => state.login.data.data)
  console.log(data)

  return  <div className="">
  <Header/>
  <div className="flex">
    <Sidebar/>
    <MainScreen/>
  </div>
  <Footer/>
  </div>

    
}

export default Home;