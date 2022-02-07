import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Input from "../input/Input";

const AddChemical = (props) => {
  return (
    <div className="add_chemical_container">
      <Header text="Add Chemical">
        <button
          className="add_chemical_header_container_remove_btn"
          onClick={props.removeHandler}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> Remove
        </button>
      </Header>
      <div className="add_chemical_input_container">
        <div className="test">
          <Input type="text" placeholder="CAS RN" bckColor="color_black " />
          {/* <div className="test1">
            {props.value.length === 0 ? (
              <ul className="model_suggestion_ul">
                {props.options.map((el) => (
                  <li
                    key={el.name}
                    onClick={() =>
                      props.foundChemicalHandler(el.name, props.name)
                    }
                  >
                    {el.name}
                  </li>
                ))}
              </ul>
            ) : null}
          </div> */}
        </div>
        <Input type="text" placeholder="Name" bckColor="color_black " />
        <Input type="text" placeholder="Purity" bckColor="color_black " />
        <Input
          type="text"
          placeholder="Moliqular FOrmula"
          bckColor="color_black "
        />
        <Input type="text" placeholder="Manufacturer" bckColor="color_black " />
        <Input type="text" placeholder="Supplier" bckColor="color_black " />
        <select
          className="issue_content_container_top_input"
          name="cars"
          id="cars"
        >
          <option value="solid">Solid</option>
          <option value="liquid">Liquid</option>
          <option value="gas">Gas</option>
        </select>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "68%",
            }}
          >
            <Input type="number" placeholder="Amount" bckColor="color_black " />
          </div>
          <div
            style={{
              width: "28%",
            }}
          >
            <select
              className="issue_content_container_top_input"
              name="cars"
              id="cars"
            >
              <option value="solid">Solid</option>
              <option value="liquid">Liquid</option>
              <option value="gas">Gas</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChemical;
