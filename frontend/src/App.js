import Login from "./pages/auth/Login";
import "./scss/main.scss";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/adminapp" element={<Layout />} />
      <Route path="/adminapp/login" element={<Login />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
