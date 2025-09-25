import { Link } from "react-router-dom";

const LifeAt = () => {

  return <div className="flex flex-col justify-center items-center w-full h-screen bg-blue-100">
  <div className="m-atuo font-bold text-2xl text-blue-500">
    Invention.Io supports the life you dremed off!!
  </div>
  <Link to="/" className="m-[1rem] text-[0.7rem] text-red-500 font-semibold">back to home</Link>
  </div>
}

export default LifeAt;