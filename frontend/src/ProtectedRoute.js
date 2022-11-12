import {Outlet} from 'react-router'
import Login from "./pages/auth/Login";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import instance from "./axios/axios_noauth";


const getLocalToken = () => {
  return localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
}

const ProtectedRoute = () => {
  const [isAuth, setIsAuth] = useState(false)
  let {token} = useSelector(state => state.auth)

  useEffect(() => {
    if (!token) {
      token = getLocalToken();
    }

    if (token) {
      instance.post('/api/token/varify/', {
        token: token
      }, {
        validateStatus: function (status) {
          return status === 200;
        }
      })
      .then(() => {
        setIsAuth(true)
      })
    }
  })

  return isAuth ? <Outlet/> : <Login/>
}

export default ProtectedRoute