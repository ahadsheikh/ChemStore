import React, {useState, useEffect} from "react";
import axios from "../../axios/axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {setTokenHandler} from "../../redux/Auth";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [adminLoginCredential, setAdminLoginCredential] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setAdminLoginCredential({...adminLoginCredential, [name]: value});
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
    setLoading(true);
    axios
      .post(`/api/token/`, adminLoginCredential)
      .then((res) => {
        localStorage.setItem(
          process.env.REACT_APP_ACCESS_TOKEN_NAME,
          res.data.access
        );
        dispatch(setTokenHandler(res.data.access));
        navigate("/adminapp");
        setLoading(false);
      })
      .catch((err) => {
        setError(true);
        (() => {
          toast(`Invalid Email or Password.`);
        })();
        setLoading(false);
      });
  };

  return (
    <>
      {error && <ToastContainer/>}
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
              type="password"
              name="password"
              placeholder="Password"
              value={adminLoginCredential.password}
              onChange={inputHandler}
            />

            <button type="submit" className="login_btn">
              {loading && (
                <div className="spinner-border me-3" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              )}
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;
