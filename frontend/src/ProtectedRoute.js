import { Outlet } from 'react-router'
import Login from "./pages/auth/Login";
import { useLayoutEffect } from 'react'
import { setTokenHandler } from "./redux/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";

const useAuth = () => {
    const {token}  = useSelector(state => state.auth)
    const localToken = localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
    return localToken !== null && token !== null
 }

const ProtectedRoute = () => {
    const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />
}

export default ProtectedRoute