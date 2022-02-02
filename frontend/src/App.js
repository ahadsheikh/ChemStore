import Login from "./pages/auth/Login";
import "./scss/main.scss";
import Layout from "./layout/Layout";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/adminapp" element={<Layout />} />
      <Route path="/adminapp/login" element={<Login />} />
    </Routes>
  );
}

export default App;
