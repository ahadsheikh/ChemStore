import {useLayoutEffect} from "react";
import Login from "./pages/auth/Login";
import "./scss/main.scss";
import Layout from "./layout/Layout";
import {Route, Routes} from "react-router-dom";
import HomeLayout from "./pages/home/layout/HomeLayout";
import {setTokenHandler} from "./redux/Auth";
import {useDispatch} from "react-redux";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(
      setTokenHandler(
        localStorage.getItem(process.env.REACT_APP_ACCESS_TOKEN_NAME)
      )
    );
  }, []);

  return (
    <Routes>
      <Route element={<ProtectedRoute/>}>
        <Route path="/adminapp" element={<Layout/>}/>
      </Route>
      <Route path="/adminapp/login" element={<Login/>}/>
      <Route path="/" element={<HomeLayout/>}/>
    </Routes>
  );
}

export default App;
