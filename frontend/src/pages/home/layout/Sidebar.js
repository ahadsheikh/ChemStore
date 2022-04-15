import React, { useState } from "react";
import { Collapse } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { openModal } from "../../../redux/Container";
import { storeHandler } from "../../../redux/StoreManagment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

const Sidebar = (props) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState({ crential: false, store: false });
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
        // onClick={() => collapseHandler("store", 1)}
        onClick={() => props.handlePage(2)}
        className="add_chemical_btn"
        aria-controls="example-collapse-text"
        aria-expanded={open.store}
      >
        {/* Store <FontAwesomeIcon icon={faAngleDown} /> */}
        Store
      </button>
      {/* <Collapse in={open.store}>
        <div className="add_chemical_collaps_btn_div">
          <ul>
            {props.storeList.map((el) => (
              <li key={el.id} onClick={() => dispatch(storeHandler(el.id))}>
                <span>{el.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </Collapse> */}
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
