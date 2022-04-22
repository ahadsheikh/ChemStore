import React from "react";

const Sidebar = (props) => {
  return (
    <div className={props.name}>
      <button
        onClick={() => props.handlePage(0)}
        className="sidebar_container_btn"
      >
        Search
      </button>
      <button
        onClick={() => props.handlePage(1)}
        className="sidebar_container_btn"
      >
        Store
      </button>
      <button
        onClick={() => props.handlePage(2)}
        className="sidebar_container_btn"
      >
        Location
      </button>
      <button
        onClick={() => props.handlePage(3)}
        className="sidebar_container_btn"
      >
        File Management
      </button>
    </div>
  );
};

export default Sidebar;
