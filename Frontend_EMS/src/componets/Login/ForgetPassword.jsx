import { Link } from "react-router-dom";

const ForgetPassword = ()=>{
  return<div className="h-screen flex flex-col justify-center items-center gap-3 font-medium">
    <p>You are not allowed to change the password. Please reach out to your respective manager. </p>
    <Link to={'/'} className="text-blue-800">Return to Home</Link>
  </div>
}

export default ForgetPassword;