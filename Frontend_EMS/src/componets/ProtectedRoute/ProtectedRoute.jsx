import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () =>{

  const data = useSelector(state => state.login.data.refreshToken)

  return data ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoute;