import React, { useState } from "react";
import axios from "../../axios/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setTokenHandler } from "../../redux/Auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminLoginCredential, setAdminLoginCredential] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(false);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setAdminLoginCredential({ ...adminLoginCredential, [name]: value });
  };

  const adminLoginHandler = (e) => {
    e.preventDefault();
    if (
      adminLoginCredential.email.length === 0 ||
      adminLoginCredential.password.length === 0
    ) {
      setError(true);
      (() => {
        toast(`Please Provide Email and Password`);
      })();
      return;
    }
    console.log("CLICKED");
    axios
      .post(`/api/token/`, adminLoginCredential)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem(
          process.env.REACT_APP_ACCESS_TOKEN_NAME,
          res.data.access
        );
        dispatch(setTokenHandler(res.data.access));
        navigate("/adminapp");
      })
      .catch((err) => {
        console.log(err.response);
        setError(true);
        (() => {
          toast(`Invalid Email or Password.`);
        })();
      });
  };

  return (
    <>
      {error && <ToastContainer />}
      <div className="login_container">
        <div className="login_container_form">
          <form onSubmit={adminLoginHandler} className="login-form">
            <input
              className="login_container_form_input"
              type="email"
              name="email"
              placeholder="E-Mail"
              value={adminLoginCredential.email}
              onChange={inputHandler}
            />
            <input
              className="login_container_form_input"
              type="text"
              name="password"
              placeholder="Password"
              value={adminLoginCredential.password}
              onChange={inputHandler}
            />
            <button type="submit" className="login_btn">
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
