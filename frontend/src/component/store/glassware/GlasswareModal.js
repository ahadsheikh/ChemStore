import React from "react";
import {Button} from "react-bootstrap";
import ShipmentInput from "../../addShipment/ShipmentInput";

const GlasswareModal = (props) => {
  return (
    <div
      className="add_chemical_input_container"
      style={{background: "#333"}}
    >
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
                value={props.glasswareCredential.name}
                handler={props.inputHandler}
                //   readOnly={!props.glasswareCredential.isNew}
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
                value={props.glasswareCredential.manufacturer}
                handler={props.inputHandler}
                //   readOnly={!props.glasswareCredential.isNew}
              />
            </div>
            <div className="col">
              <ShipmentInput
                labelShow
                type="text"
                placeholder="Size"
                bckColor="color_black "
                name="size"
                value={props.glasswareCredential.size}
                handler={props.inputHandler}
                //   readOnly={!props.glasswareCredential.isNew}
              />
            </div>
            <div className="col">
              <ShipmentInput
                labelShow
                type="text"
                placeholder="Material Type"
                bckColor="color_black "
                name="material_type"
                value={props.glasswareCredential.material_type}
                handler={props.inputHandler}
                //   readOnly={!props.glasswareCredential.isNew}
              />
            </div>
            <div className="col">
              <ShipmentInput
                labelShow
                type="text"
                placeholder="Supplier"
                bckColor="color_black "
                name="supplier"
                value={props.glasswareCredential.supplier}
                handler={props.inputHandler}
                //   readOnly={!props.glasswareCredential.isNew}
              />
            </div>
            <div className="col">
              <label>{`Quantity :  ${props.glasswareCredential.quantity}`}</label>
              <ShipmentInput
                type="number"
                labelShow={false}
                placeholder={`Quantity`}
                bckColor="color_black "
                name="newQuantity"
                value={props.glasswareCredential.newQuantity}
                handler={props.inputHandler}
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
                <button
                  className="btn btn-dark me-3"
                  style={{fontSize: "1.6rem"}}
                >
                  Close
                </button>
                <Button
                  onClick={props.submitHandler}
                  variant="primary"
                  style={{fontSize: "1.6rem"}}
                  disabled={props.submitLoading}
                >
                  {props.submitLoading && (
                    <div
                      className="spinner-border me-2"
                      role="status"
                      style={{width: "1.4rem", height: "1.4rem"}}
                    >
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  )}
                  {props.btnText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlasswareModal;
