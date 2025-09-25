import { useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { save } from "../../store/slice/saveFiltersSlice";

const SaveFilterModel = ({onClose}) =>{

  const filter = useSelector(state => state.filter.filter)
  const filters = useSelector(state => state.savefilter)
  const dispatch = useDispatch()

  const outerdiv = useRef()
  const nameValue = useRef()
  const handleClose = (e) => {
    if (outerdiv.current == e.target){
      onClose()
    }
  }

  const handleSave = (e) => {
    e.preventDefault()
    const name = nameValue.current.value
    const data = {
      [name]: filter
    }
    
    dispatch(save(data));

    onClose()
  }

  console.log(filters)


  return <div onClick={(e) => {handleClose(e)}} ref={outerdiv} className="flex flex-col justify-center items-center border-2 fixed inset-0 h-screen backdrop-blur-sm">
    <div className="flex flex-col justify-center  text-white font-bold">
      <div className="text-black self-end text-2xl mb-3">
        <button onClick={onClose}><RxCross2 /></button>
      </div>
      <div className="bg-violet-500 flex flex-col items-center justify-center gap-5 text-2xl rounded-md w-[30rem] h-[20rem]">
        <form onSubmit={(e)=>{handleSave(e)}} className="flex flex-col items-center justify-center gap-5">
          <label htmlFor="filterName">Filter name</label>
          <input ref={nameValue} className="bg-white text-black rounded-md px-2 outline-none  " placeholder="save me" name="filterName" type="text" />
          <button className="bg-indigo-600 px-2 rounded-md  ">Save</button>
        </form>
      </div>
    </div>
  </div>
}

export default SaveFilterModel;