import Footer from "../Footer/Footer";
import Header from "../Header/Header";

const PreviewScreen = ()=>{
  return <div>
    <Header/>
      <div className="mt-17 flex-col flex items-center">
        <div className="text-4xl font-bold text-amber-800 p-[2rem]">
            Invention.io 
        </div>
        <div className="flex justify-center p-[1rem] text-2xl font-bold text-amber-500">
          Employee Tracking Management System
        </div>
        <div className="items-center flex flex-col gap-5 m-[1rem]">
          <h3 className="font-semibold ">
            Boost your team’s productivity with our Employee Tracking Management System!
          </h3>
          <p className="font-semibold ">
            Built on the MERN Stack, this powerful tool simplifies employee onboarding, task assignment, and progress tracking—all in one place.
          </p>
        </div>   
      </div>
    <Footer/>
  </div>
} 

export default PreviewScreen;