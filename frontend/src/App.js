import { useLayoutEffect } from "react";
import Login from "./pages/auth/Login";
import "./scss/main.scss";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/home/layout/HomeLayout";
import { setTokenHandler } from "./redux/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { token } = useSelector((state) => state.auth);
  console.log(token)
  useLayoutEffect(() => {
    dispatch(
      setTokenHandler(
        localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
      )
    );
  }, []);
  let routes = (
    <>
      <Route path="/adminapp/login" element={<Login />} />
      <Route path="/" element={<HomeLayout />} />
    </>
  );

  if (token) {
    routes = (
      <>
        <Route path="/adminapp" element={<Layout />} />
        <Route path="/adminapp/login" element={<Login />} />
        <Route path="/" element={<HomeLayout />} />
      </>
    );
  }
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route path="/adminapp" element={<Layout />} />
      </Route>
      <Route path="/adminapp/login" element={<Login />} />
      <Route path="/" element={<HomeLayout />} />
    </Routes>
  );
}

export default App;
