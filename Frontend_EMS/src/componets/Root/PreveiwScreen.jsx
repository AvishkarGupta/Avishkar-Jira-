import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PreviewScreen = ()=>{
  return <div>
    <Header/>
      <div className="mt-17 flex-col flex items-center h-[30rem]">
        <div className="text-4xl font-bold text-amber-800 p-[2rem]">
            Invention.io 
        </div>
        <div className="flex flex-col p-[1rem] text-2xl font-bold text-amber-500">
          <div className="px-[1rem] text-2xl font-bold text-amber-500">
            Task Management System
          </div>
          <div className="self-end px-[1rem] text-sm font-bold text-amber-800">
            Inspired by Atlassian Jira 
          </div>
        </div>
        <div className="items-center flex flex-col gap-5 m-[1rem]">
          <h3 className="font-semibold ">
            Boost your team’s productivity with our Task Tracking/Management System!
          </h3>
          <p className="font-semibold ">
            Built with MERN, this powerful tool simplifies user registration, task creation, allocation, progress tracking—all in one place.
          </p>
        </div>
        <div className="self-end mr-[5rem] mt-[8rem]">
          Designed and Developed by- <span className="font-bold text-xl text-red-500">Avishkar Gupta</span>
        </div>
           
      </div>
    <Footer/>
  </div>
} 

export default PreviewScreen;