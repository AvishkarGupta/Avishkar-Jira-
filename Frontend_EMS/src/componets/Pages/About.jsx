import { Link } from "react-router-dom";

const About = () => {

  return <div className="w-full h-screen bg-pink-100">
    <div className="flex justify-center p-[1rem] text-3xl font-bold text-green-800">
      Full-Stack Employee Tracking Management System (MERN)
    </div>
    <div className="p-[1rem] items-center flex flex-col">
      <h3>
        Hi folks! 
      </h3>
      <p>
        This is my first full stack, production-grade, scalable project.
      </p>
      <p>
        A Employee Tracking Management System built using the MERN Stack <span className="text-red-500 font-bold">(MongoDB, Express.js, React, Node.js)</span>.
      </p>
    </div>
    <div className="p-[1rem] items-center flex flex-col">
      <p className="text-2xl font-semibold text-green-700 ">
        Lets have a look to some Key features.
      </p>
      </div>
      <div className="flex flex-col items-center">
        <div>
          <p className="">
            <span className="font-semibold text-[1.2rem] text-green-500">Authentication & Security:</span> User registration, secure login, and logout flows fully implemented.
          </p>
          <p className="">
            <span className="font-semibold text-[1.2rem] text-green-500">Role-Based Features:</span>
            <ul className="pl-[1rem]">
              <li>  
               <span className="font-semibold text-[1.2rem]">Admin:</span> Admins can set up new accounts for onboarding employees.
              </li>
              <li>
                <span className="font-semibold text-[1.2rem]">Manager: </span>Managers can create, update, and assign tasks.
              </li>
            </ul>
          </p>
          <p className="">
            <span className="font-semibold text-[1.2rem] text-green-500">Production-Grade Codebase:</span> Organized folder structure designed for scalability and maintainability.
          </p>
          <p className="">
            <span className="font-semibold text-[1.2rem] text-green-500">Smooth User Experience:</span> Optimized for performance and seamless task management.
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center p-[2rem] pt-[4rem] font-bold text-blue-600" >
        <p>
          Building this project has deepened my understanding of full-stack development and scalable architecture.
        </p>
        <p>
           If you have feedback or feature suggestions, I’d love to hear them!
        </p>
      </div>
      <div className="flex flex-col items-end p-[2rem] font-bold text-[0.8rem] text-red-600" >
        <Link to="/">back to home</Link>
      </div>
  </div>
}


export default About; 