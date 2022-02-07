import React from "react";
import Input from "../input/Input";

const ChemicalModal = (props) => {
  return (
    <div className="add_chemical_modal">
      <input
        className="add_chemical_modal_input"
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.inputHandler}
      />
      {props.value.length > 0 ? (
        <ul className="model_suggestion_ul">
          {props.options.map((el) => (
            <li
              key={el.name}
              onClick={() => props.foundChemicalHandler(el.name, props.name)}
            >
              {el.name}
            </li>
          ))}
        </ul>
      ) : null}
      {/* <button className="add_chemical_create_btn">Create</button> */}
    </div>
  );
};

export default ChemicalModal;
