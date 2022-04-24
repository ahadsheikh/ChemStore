import React from "react";
import { Button } from "react-bootstrap";
import ShipmentInput from "../../addShipment/ShipmentInput";

const InstrumentModal = (props) => {
  return (
    <div
      className="add_chemical_input_container"
      style={{ background: "#333" }}
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
                value={props.instrumentCredential.name}
                handler={props.inputHandler}
                // readOnly={!props.instrumentCredential.isNew}
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
                value={props.instrumentCredential.manufacturer}
                handler={props.inputHandler}
                // readOnly={!props.instrumentCredential.isNew}
              />
            </div>
            <div className="col">
              <ShipmentInput
                labelShow
                type="text"
                placeholder="Supplier"
                bckColor="color_black "
                name="supplier"
                value={props.instrumentCredential.supplier}
                handler={props.inputHandler}
                // readOnly={!props.instrumentCredential.isNew}
              />
            </div>
            <div className="col">
              <label>{`Quantity :  ${props.instrumentCredential.quantity}`}</label>
              <ShipmentInput
                type="number"
                labelShow={false}
                placeholder={`Quantity`}
                bckColor="color_black "
                name="newQuantity"
                value={props.instrumentCredential.newQuantity}
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
                  style={{ fontSize: "1.6rem" }}
                >
                  Close
                </button>
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

export default InstrumentModal;
