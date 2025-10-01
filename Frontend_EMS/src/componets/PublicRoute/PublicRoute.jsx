import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom"

const PublicRoute = () => {

  const data =  useSelector(state => state.login.data.refreshToken)

  return !data ? <Outlet/> : <Navigate to="/home"/> 
}

export default PublicRoute;