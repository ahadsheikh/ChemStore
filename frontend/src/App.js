import Login from "./pages/auth/Login";
import "./scss/main.scss";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
// import Home from "./pages/home/Home";
// import Test from "./pages/test/Test";
import HomeLayout from "./pages/home/layout/HomeLayout";

function App() {
  return (
    <Routes>
      <Route path="/adminapp" element={<Layout />} />
      <Route path="/adminapp/login" element={<Login />} />
      <Route path="/" element={<HomeLayout />} />
    </Routes>
  );
}

export default App;
