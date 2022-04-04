import React from "react";

const Login = () => {
  return (
    <div className="login_container">
      <div className="login_container_form">
        <form action="#" className="login-form">
          <input
            className="login_container_form_input"
            type="text"
            name="username"
            placeholder="Username"
          />
          <input
            className="login_container_form_input"
            type="text"
            name="password"
            placeholder="Password"
          />
          <button type="submit" className="login_btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};
export default Login;
