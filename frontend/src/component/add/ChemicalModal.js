import React from "react";

const ChemicalModal = (props) => {
  return (
    <div>
      <input
        type="text"
        placeholder={props.placeholder}
        name={props.name}
        value={props.value}
        onChange={props.inputHandler}
      />
      {props.value.length > 0 ? (
        <ul>
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
    </div>
  );
};

export default ChemicalModal;
