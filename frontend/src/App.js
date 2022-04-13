import { useLayoutEffect } from "react";
import Login from "./pages/auth/Login";
import "./scss/main.scss";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "./pages/home/layout/HomeLayout";
import { setTokenHandler } from "./redux/Auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  useLayoutEffect(() => {
    dispatch(setTokenHandler(sessionStorage.getItem("token")));
  }, []);
  return (
    <Routes>
      {token ? (
        <Route path="/adminapp" element={<Layout />} />
      ) : (
        <Route path="/" element={<HomeLayout />} />
      )}
      <Route path="/adminapp/login" element={<Login />} />
      <Route path="/" element={<HomeLayout />} />
    </Routes>
  );
}

export default App;
