import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => {
  return (
    <nav className="nav_container">
      <h2 className="nav_container_title">ChemStore</h2>
      <div className="nav_container_logout">
        {/* <button className="nav_container_logout_btn">logout</button> */}
        <FontAwesomeIcon
          className="nav_container_logout_icon"
          icon={faSignOutAlt}
        />
      </div>
    </nav>
  );
};

export default Navigation;
