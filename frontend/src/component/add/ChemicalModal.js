import React from "react";

const ChemicalModal = (props) => {
  return (
    <div className="add_chemical_modal">
      <div className="add_chemical_modal_div">
        <input
          className="add_chemical_modal_input"
          type="text"
          placeholder={props.placeholder}
          name={props.name}
          value={props.value}
          onChange={props.inputHandler}
        />
        <div>
          <button
            className="add_chemical_create_btn"
            onClick={() =>
              props.foundChemicalHandler(props.value, props.name, false)
            }
          >
            Create
          </button>
        </div>
      </div>
      {props.value.length > 0 && (
        <ul className="model_suggestion_ul">
          {props.isProcessing ? (
            <p>loading..........</p>
          ) : (
            props.options.map((el) => (
              <li
                key={el.name}
                onClick={() =>
                  props.foundChemicalHandler(el.name, props.name, true, el)
                }
              >
                {el.name}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default ChemicalModal;
