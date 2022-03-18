import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = (props) => {
  return (
    <nav className="nav_container">
      <h2 className="nav_container_title">ChemStore</h2>
      <div className="nav_menu_bar_div">
        <FontAwesomeIcon
          onClick={props.handler}
          className="nav_menu_icon"
          icon={faBars}
        />
      </div>

      <div className="nav_container_logout">
        <FontAwesomeIcon
          className="nav_container_logout_icon"
          icon={faSignOutAlt}
        />
      </div>
    </nav>
  );
};

export default Navigation;
