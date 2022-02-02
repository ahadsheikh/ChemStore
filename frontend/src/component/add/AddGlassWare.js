import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AddGlassWare = (props) => {
  return (
    <div className="add_chemical_container">
      <div className="add_chemical_header_container">
        <p className="add_chemical_header_container_title">Add Glass Ware</p>
        <button
          className="add_chemical_header_container_remove_btn"
          onClick={props.removeHandler}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Remove
        </button>
      </div>
      <div>
        <input
          className="add_chemical_container_input"
          type="text"
          placeholder="Glass Ware Name"
        />
        <br />
        <input
          className="add_chemical_container_input"
          type="number"
          placeholder="Amount"
        />
        <input
          className="add_chemical_container_input"
          type="text"
          placeholder="CAS No"
        />
      </div>
    </div>
  );
};

export default AddGlassWare;