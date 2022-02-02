import React, { useState } from "react";
import CollapseItem from "../component/collapse/CollapseItem";
import { Collapse, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/Container";

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
        className="sidebar_container_btn"
        // onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
      >
        Add Chemical
      </button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <button onClick={() => dispatch(openModal("chemical"))}>
            Add Chemical
          </button>
          <button onClick={() => dispatch(openModal("instrument"))}>
            Add Instrument
          </button>
          <button onClick={() => dispatch(openModal("glassWare"))}>
            Add Glass Ware
          </button>
        </div>
      </Collapse>
      <button
        onClick={() => props.handlePage(2)}
        className="sidebar_container_btn"
      >
        Create an Issue
      </button>
      <button
        onClick={() => props.handlePage(3)}
        className="sidebar_container_btn"
      >
        User Managment
      </button>
    </div>
  );
};

export default Sidebar;
