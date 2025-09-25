import { Link } from "react-router-dom"
import { Footer, Header, Sidebar } from "../Index"

const WeAreHiring = () => {

  return <>
  <div className="w-full h-screen overflow-hidden">
  <Header/>
    <div className="flex">
    <Sidebar/>
    <div className="mt-17 flex flex-col w-full items-center gap-3">
      <div className="m-[1rem] font-semibold text-3xl">
        We Are Hiring!!
      </div>
      <div className="w-[15rem] h-[10rem] bg-green-400 rounded p-auto flex justify-center items-center">
        <div className="text-white font-semibold">we'er hiring.</div>
      </div>
      <div className="text-2xl font-bold mt-[2rem]">
        We are always looking to hire the right talent to help us grow.
      </div>
      <div className="mt-[3rem]">
        <div className="font-semibold ">
        Here are open positions:
       </div>
        <div className="text-blue-600 font-semibold m-4 text-[1.2rem] flex flex-col">
          <Link className="border-b-2 mb-2 pl-2">Content Editor</Link>
          <Link className="border-b-2 mb-2 pl-2">UI/UX Website Designer</Link>
          <Link className="border-b-2 mb-2 pl-2">Creative article writer</Link>
          <Link className="border-b-2 mb-2 pl-2">Full Stack Developer (MERN Stack)</Link>
       </div>
      </div>
      <div className="text-red-500">
       Disclaimer: This page is part of my personal project. No active hiring is being watched by any HR.
      </div>
    </div>
    </div>
  <Footer/>
  </div>
  </>
}

export default WeAreHiring