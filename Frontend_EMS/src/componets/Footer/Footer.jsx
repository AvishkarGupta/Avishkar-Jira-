import { Link } from "react-router-dom";
import {FaInstagram, FaWhatsapp, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { CiBarcode } from "react-icons/ci";
import { useSelector } from "react-redux";



const Footer = ()=>{

  const data = useSelector(state => state.login.refreshToken)
  const titles = [
    {name: "LinkedIn" , URI: "https://www.linkedin.com/in/gupta-avishkar/", icon:<IoLogoLinkedin />}, 
    {name: "Git hub" , URI: "https://github.com/AvishkarGupta", icon:<FaGithub />}, 
    {name: "Twiter" , URI: "", icon:<FaXTwitter />}, 
    {name: "Instagram", URI: "", icon:<FaInstagram />}, 
    {name: "Whatsapp", URI: "", icon:<FaWhatsapp />}, 
  ]

  return<>
  {data ? 
    <div className="flex bg-[#0c4160] justify-evenly font-medium text-white">
      <div>Co-Powered by: Avishkar!! </div>
      <div>Tech-Sackt: Mongo DB, Express and React</div>
      <div><Link to={"https://github.com/AvishkarGupta/Employee-Management-System-Jira-like-Tool-"}>Source Code</Link> </div>
    </div>
    :
    <div className="bg-[#0c4160] text-white flex justify-evenly gap-100 py-5">
      <div className="flex gap-5">
        <div className="m-auto text-4xl">
          <CiBarcode />
        </div>
        <p className="m-auto font-mono">Every console.log matters</p>
      </div>
      <div className="">
        <h2 className="text-4xl font-mono font-bold">Follow us on</h2>
        <div className="flex flex-col justify-around">
          {titles.map( (title)=> (
          <a className=" font-bold shadow-orange-400 flex mb-2" href={`${title.URI}`}  key={title.name} >{title.name} <span className="pt-1.5 pl-3">{title.icon}</span> </a>
        ) )}
        </div>
      </div>
    </div>
  }
  </>
}

export default Footer;