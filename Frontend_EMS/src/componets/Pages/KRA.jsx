import { Link, useNavigate } from "react-router-dom";
import { Footer, Header } from "../Index";
import { IoIosArrowBack } from "react-icons/io";

const KRA = () => {

  const navigate = useNavigate()
  const goBack = () =>{
    navigate(-1)
  }

  return <div className="w-screen h-auto bg-[rgba(214,214,76,0.91)]">
    <Header/>
    <div className="mt-17 ">
      <Link onClick={goBack} className="pl-[1rem] py-[0.5rem] fixed flex  mt-4"><IoIosArrowBack /> <span className="relative bottom-1">Back</span></Link>
      <div className="flex flex-col items-center justify-center">
        <div className="text-4xl font-bold my-6">
          KRA
        </div>
        <div className="w-full px-[1rem] mb-[4rem]">
          <div className="flex justify-center w-full">
            <div className="text-2xl font-semibold">
                CSAT
            </div>
          </div>
          <div className=" flex justify-evenly border-2 rounded">
            <div className="flex justify-center border-2 w-1/3 py-1">
              Avishkar 
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              5
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              4.5
            </div>
          </div>
        </div>
        <div className="w-full px-[1rem] mb-[4rem]">
          <div className="flex justify-center w-full">
            <div className="text-2xl font-semibold">
                Productivity
            </div>
          </div>
          <div className=" flex justify-evenly border-2 rounded">
            <div className="flex justify-center border-2 w-1/3 py-1">
              Avishkar
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              100%
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              119%
            </div>
          </div>
        </div>
        <div className="w-full px-[1rem] mb-[4rem]">
          <div className="flex justify-center w-full">
            <div className="text-2xl font-semibold">
                Utilization
            </div>
          </div>
          <div className=" flex justify-evenly border-2 rounded">
            <div className="flex justify-center border-2 w-1/3 py-1">
              Avishkar
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              100%
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              120%
            </div>
          </div>
        </div>
        <div className="w-full px-[1rem] mb-[4rem]">
          <div className="flex justify-center w-full">
            <div className="text-2xl font-semibold">
                Performance Rating
            </div>
          </div>
          <div className=" flex justify-evenly border-2 rounded">
            <div className="flex justify-center border-2 w-1/3 py-1">
              Avishkar
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              5
            </div>
            <div className="flex justify-center border-2 w-1/3 py-1 ">
              5
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
}

export default KRA;