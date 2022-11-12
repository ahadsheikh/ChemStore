import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Input from "../input/Input";

const AddChemical = (props) => {
  return (
    <div className="add_chemical_container">
      <Header text="Add Chemical">
        <button
          className="central_header_remove_btn"
          onClick={props.removeHandler}
        >
          <FontAwesomeIcon icon={faTrashAlt}/> <span>Remove</span>
        </button>
      </Header>
      <div className="add_chemical_input_container">
        <div className="test">
          <Input
            type="text"
            placeholder="CAS RN"
            bckColor="color_black "
            name="CAS_RN"
            value={props.valueObj.CAS_RN}
            handler={props.handler}
            readOnly={props.readOnly}
            isRequired={true}
          />
        </div>
        <Input
          type="text"
          placeholder="Name"
          bckColor="color_black "
          name="name"
          value={props.valueObj.name}
          handler={props.handler}
          readOnly={props.readOnly}
          isRequired={true}
        />
        <Input
          type="text"
          placeholder="Purity"
          bckColor="color_black "
          name="purity"
          value={props.valueObj.purity}
          handler={props.handler}
          readOnly={props.readOnly}
          isRequired={true}
        />
        <Input
          type="text"
          placeholder="Moliqular FOrmula"
          bckColor="color_black "
          name="molecular_formula"
          value={props.valueObj.molecular_formula}
          handler={props.handler}
          readOnly={props.readOnly}
          isRequired={true}
        />
        <Input
          type="text"
          placeholder="Manufacturer"
          bckColor="color_black "
          name="manufacturer"
          value={props.valueObj.manufacturer}
          handler={props.handler}
          readOnly={props.readOnly}
          isRequired={true}
        />
        <Input
          type="text"
          placeholder="Supplier"
          bckColor="color_black "
          name="supplier"
          value={props.valueObj.supplier}
          handler={props.handler}
          readOnly={props.readOnly}
          isRequired={true}
        />
        <select
          className="issue_content_container_top_input"
          name="state"
          value={props.valueObj.state}
          onChange={props.handler}
          disabled={props.readOnly}
          required
        >
          <option value="" disabled selected>Please Choose...</option>
          <option value="SOLID">Solid</option>
          <option value="LIQUID">Liquid</option>
          <option value="GAS">Gas</option>
        </select>
        <div className="add_chemical_select_div">
          <div className="add_chemical_select_div_left_div">
            <Input
              type="number"
              placeholder="Amount"
              bckColor="color_black "
              name="quantity"
              value={props.valueObj.quantity}
              handler={props.handler}
              readOnly={false}
              isRequired={true}
            />
          </div>
          <div className="add_chemical_select_div_right_div">
            <select
              className="issue_content_container_top_input"
              name="cars"
              id="cars"
            >
              <option value="liquid">ml</option>
              <option value="solid">l</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddChemical;
