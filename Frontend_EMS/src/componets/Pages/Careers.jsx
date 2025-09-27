import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";

const Careers = () => {

  const nameValue = useRef()
  const emailValue = useRef()
  const contactValue = useRef()

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = nameValue.current.value
    const email = emailValue.current.value
    const contact = contactValue.current.value

    console.log("hello", name, email, contact)
    axios.post("")
    .then( (res)=>{
      console.log(res)
    } )
    .catch((err)=>{
      console.log(err)
    })
  }

  return <div className="flex flex-col justify-center items-center w-full h-screen bg-blue-100">
  <div className="m-atuo font-bold text-2xl text-blue-500">
     If you code even while sleeping. You are at the right place.
  </div>
  <Link to="/" className="m-[1rem] text-[0.7rem] text-red-500 font-semibold">back to home</Link>
  <div>
    <form className="[w-30%] bg-blue-200 p-3 rounded-2xl shadow-2xl" onSubmit={handleSubmit}>
      <div className="flex justify-center">
        <h2 className="text-2xl ">Stay connect!!</h2>
      </div>
      <div className="flex gap-10 justify-between m-1">
        <label htmlFor="name"> Name</label>
        <input ref={nameValue} className="border-b-2 border-amber-400 outline-none px-2" type="text" name="name" />
      </div>
      <div className="flex gap-10 justify-between m-1">
        <label htmlFor="email"> email</label>
        <input ref={emailValue} className="border-b-2 border-amber-400 outline-none px-2" type="email" name="email" />
      </div>
      <div className="flex gap-10 justify-between m-1">
        <label htmlFor="contact">Contact Number</label>
        <input ref={contactValue} className="border-b-2 border-amber-400 outline-none px-2" type="text" name="contact" />
      </div>
      <div className="flex justify-center mt-4">
      <button className="bg-green-400 px-3 rounded-2xl py-1">Save</button>
      </div>
    </form>
  </div>
  </div>
}

export default Careers;