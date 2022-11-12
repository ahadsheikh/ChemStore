import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import Header from "./Header";
import Input from "../input/Input";

const AddGlassWare = (props) => {
  return (
    <div className="add_chemical_container">
      <Header text="Add Glass Ware">
        <button
          className="central_header_remove_btn"
          onClick={props.removeHandler}
        >
          <FontAwesomeIcon icon={faTrashAlt}/> <span>Remove</span>
        </button>
      </Header>
      <div className="add_chemical_input_container">
        <Input
          type="text"
          placeholder="Name"
          bckColor="color_black "
          name="name"
          value={props.valueObj.name}
          handler={props.handler}
          readOnly={props.readOnly}
        />
        <Input
          type="text"
          placeholder="Manufacturer"
          bckColor="color_black "
          name="manufacturer"
          value={props.valueObj.manufacturer}
          handler={props.handler}
          readOnly={props.readOnly}
        />
        <Input
          type="text"
          placeholder="Supplier"
          bckColor="color_black "
          name="supplier"
          value={props.valueObj.supplier}
          handler={props.handler}
          readOnly={props.readOnly}
        />
        <Input
          type="text"
          placeholder="Size"
          bckColor="color_black "
          name="size"
          value={props.valueObj.size}
          handler={props.handler}
          readOnly={props.readOnly}
        />
        <Input
          type="text"
          placeholder="Material Type"
          bckColor="color_black "
          name="material_type"
          value={props.valueObj.material_type}
          handler={props.handler}
          readOnly={props.readOnly}
        />
        <Input
          type="text"
          placeholder="Quantity"
          bckColor="color_black "
          name="quantity"
          value={props.valueObj.quantity}
          handler={props.handler}
          readOnly={false}
        />
      </div>
    </div>
  );
};

export default AddGlassWare;
