import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import ShipmentInput from "../addShipment/ShipmentInput";
import Header from "../add/Header";
import { Table, Button } from "react-bootstrap";

const GlassWare = (props) => {
  return (
    <div className="add_chemical_container">
      <Header text="Add Instrument">
        <button
          className="central_header_remove_btn"
          onClick={props.removeHandler}
        >
          <FontAwesomeIcon icon={faTrashAlt} /> <span>Remove</span>
        </button>
      </Header>
      <div className="add_chemical_input_container">
        <div className="test">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Name"
                  bckColor="color_black "
                  name="name"
                  value={props.data.name}
                  handler={props.inputHandler}
                  readOnly={true}
                />
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row row-cols-1 row-cols-sm-2">
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Manufacturer"
                  bckColor="color_black "
                  name="manufacturer"
                  value={props.data.manufacturer}
                  handler={props.inputHandler}
                  readOnly={true}
                />
              </div>
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Size"
                  bckColor="color_black "
                  name="size"
                  value={props.data.size}
                  handler={props.inputHandler}
                  readOnly={true}
                />
              </div>
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Material Type"
                  bckColor="color_black "
                  name="material_type"
                  value={props.data.material_type}
                  handler={props.inputHandler}
                  readOnly={true}
                />
              </div>
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Supplier"
                  bckColor="color_black "
                  name="supplier"
                  value={props.data.supplier}
                  handler={props.inputHandler}
                  readOnly={true}
                />
              </div>
              <div className="col">
                <label>{`Quantity :  ${props.data.quantity}`}</label>
                <ShipmentInput
                  type="number"
                  labelShow={false}
                  placeholder={`Quantity`}
                  bckColor="color_black "
                  name="newQuantity"
                  value={props.value}
                  handler={props.quantityHandler}
                />
              </div>
              <div className="col">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "3.5rem",
                  }}
                >
                  <Button
                    onClick={props.submitHandler}
                    variant="primary"
                    style={{ fontSize: "1.6rem" }}
                    disabled={props.submitLoading}
                  >
                    {props.submitLoading && (
                      <div
                        className="spinner-border me-2"
                        role="status"
                        style={{ width: "1.4rem", height: "1.4rem" }}
                      >
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    )}
                    {props.mode ? `Add` : "Edit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassWare;
