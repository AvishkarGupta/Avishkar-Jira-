import axios from "axios";
import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/slice/loginSlice";
const API_URL = import.meta.env.VITE_API_URL;

const EditProfilePopUpModel = ({onClose}) => {

  const avatarValue = useRef()
  const outterDiv = useRef()
  const token = useSelector(state => state.login.data.refreshToken)
  const dispatch = useDispatch()

  const saveChanges = (e) =>{
    e.preventDefault()

    const avatar = avatarValue.current.files[0]
    const formData = new FormData()
    formData.append("Name", name)
    formData.append("avatar", avatar)

    axios.post(`${API_URL}/api/users/edit-avatar`, formData, {headers:{
      authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data"
    }})
    .then(res => {
      console.log(res)
      dispatch(loginUser(res.data.data))
    })
    .catch(err => console.log(err))
    .finally(() => {onClose()})

  }

  const handleClose = (e) =>{

    if (e.target == outterDiv.current) onClose()
  }

  return <div ref={outterDiv} onClick={(e) =>{handleClose(e)}} className="h-screen  inset-0 fixed flex justify-center items-center backdrop-blur-sm">
    <div className="flex flex-col gap-2">
      <div className="self-end ">
        <RxCross2 onClick={onClose} />
      </div>
      <div className="bg-violet-600 w-[300px] h-[200px] rounded-2xl flex flex-col items-center justify-center p-3 text-white">
        <div className="text-white font-bold mt-1 text-xl self-center">
          Choose Avatar
        </div>
        <form onSubmit={(e) => {saveChanges(e)}} className="flex flex-col justify-center items-start">
          <div className="my-2">
            <label className="font-semibold" htmlFor="avatar">Avatar</label>
            <input 
              className="rounded w-[10rem] px-2 text-sm ml-3 outine-none bg-white text-black placeholder:text-gray-500"
              ref={avatarValue}
              required
              name="avatar"  
              type="file"  />
          </div>
          <button className="self-center bg-[#4a94a8] p-1 rounded font-semibold">Save Changes</button>
        </form>
      </div>
    </div>
  </div>
}

export default EditProfilePopUpModel;