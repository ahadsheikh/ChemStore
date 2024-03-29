import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOutAlt, faBars} from "@fortawesome/free-solid-svg-icons";
import {removeTokenHandler} from "../redux/Auth";
import {useDispatch} from "react-redux";
import {Link, useNavigate} from "react-router-dom";

const Navigation = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(removeTokenHandler());
    navigate("/adminapp/login");
    localStorage.removeItem(process.env.REACT_APP_ACCESS_TOKEN_NAME);
  };
  return (
    <nav className="nav_container">
      <Link to={"/"}><h2 className="nav_container_title">ChemStore</h2></Link>
      <div className="nav_menu_bar_div">
        <FontAwesomeIcon
          onClick={props.handler}
          className="nav_menu_icon"
          icon={faBars}
        />
      </div>

      <div className="nav_container_logout">
        {/* <FontAwesomeIcon
          className="nav_container_logout_icon"
          icon={faSignOutAlt}
        /> */}
        <button
          className="btn btn-warning"
          onClick={logoutHandler}
          style={{fontSize: "1.6rem"}}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
