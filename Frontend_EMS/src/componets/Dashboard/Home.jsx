import {Header, Sidebar, MainScreen, Footer} from "../Index.js";

const Home = ()=>{
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