import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../redux/Container";
import { storeHandler } from "../redux/StoreManagment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState({ credential: false, store: false });
  
  const collapseHandler = (name, id) => {
    props.handlePage(id);
    
    setOpen({ ...open, [name]: !open[name] });
  };

  return (
    <div className={props.name}>
      <button
        onClick={() => props.handlePage(0)}
        className="sidebar_container_btn"
      >
        Search
      </button>
      <button
        onClick={() => collapseHandler("credential", 1)}
        className="add_chemical_btn"
        aria-controls="example-collapse-text"
        aria-expanded={open.credential}
      >
        Add Shipment <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <Collapse in={open.credential}>
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
        onClick={() => collapseHandler("store", 2)}
        className="add_chemical_btn"
        aria-controls="example-collapse-text"
        aria-expanded={open.store}
      >
        Store <FontAwesomeIcon icon={faAngleDown} />
      </button>
      <Collapse in={open.store}>
        <div className="add_chemical_collaps_btn_div">
          <ul>
            {props.storeList.map((el) => (
              <li key={el.id} onClick={() => dispatch(storeHandler(el.id))}>
                <span>{el.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Collapse>
      <button
        onClick={() => props.handlePage(3)}
        className="sidebar_container_btn"
      >
        Location
      </button>
      <button
        onClick={() => props.handlePage(4)}
        className="sidebar_container_btn"
      >
        Create an Issue
      </button>
      <button
        onClick={() => props.handlePage(5)}
        className="sidebar_container_btn"
      >
        User Managment
      </button>
      <button
        onClick={() => props.handlePage(6)}
        className="sidebar_container_btn"
      >
        Shipment
      </button>
    </div>
  );
};

export default Sidebar;
