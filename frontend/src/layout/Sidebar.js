import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const claa = () => {
    props.handlePage(1);
    setOpen((preState) => !preState);
  };
  return (
    <div className="sidebar_container">
      <button
        onClick={() => props.handlePage(0)}
        className="sidebar_container_btn"
      >
        Search
      </button>
      <button
        onClick={claa}
        // onClick={() => props.handlePage(1)}
        className="add_chemical_btn"
        // onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Add Chemical <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <Collapse in={open}>
        <div className="add_chemical_collaps_btn_div">
          <ul>
            <li onClick={() => dispatch(openModal("chemical"))}>
              <span>Add Chemical</span>
            </li>
            <li onClick={() => dispatch(openModal("instrument"))}>
              <span> Add Instrument</span>
            </li>
            <li onClick={() => dispatch(openModal("glassWare"))}>
              <span> Add Glass Ware</span>
            </li>
          </ul>
        </div>
      </Collapse>
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
        Create an Issue
      </button>
      <button
        onClick={() => props.handlePage(4)}
        className="sidebar_container_btn"
      >
        User Managment
      </button>
    </div>
  );
};

export default Sidebar;
