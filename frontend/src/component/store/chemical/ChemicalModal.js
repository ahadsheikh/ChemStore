import React from "react";
import { Button } from "react-bootstrap";
import ShipmentInput from "../../addShipment/ShipmentInput";
const ChemicalModal = (props) => {
  return (
    <>
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
                  value={props.chemicalCredential.name}
                  handler={props.inputHandler}
                  //   readOnly={!chemicalCredential.isNew}
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
                  placeholder="CAS RN"
                  bckColor="color_black "
                  name="CAS_RN"
                  value={props.chemicalCredential.CAS_RN}
                  handler={props.inputHandler}
                  //   readOnly={!chemicalCredential.isNew}
                />
              </div>
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Moliqular Formula"
                  bckColor="color_black "
                  name="molecular_formula"
                  value={props.chemicalCredential.molecular_formula}
                  handler={props.inputHandler}
                  //   readOnly={!chemicalCredential.isNew}
                />
              </div>
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Purity"
                  bckColor="color_black "
                  name="purity"
                  value={props.chemicalCredential.purity}
                  handler={props.inputHandler}
                  //   readOnly={!chemicalCredential.isNew}
                />
              </div>
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Manufacturer"
                  bckColor="color_black "
                  name="manufacturer"
                  value={props.chemicalCredential.manufacturer}
                  handler={props.inputHandler}
                  //   readOnly={!chemicalCredential.isNew}
                />
              </div>
              <div className="col">
                <ShipmentInput
                  labelShow
                  type="text"
                  placeholder="Supplier"
                  bckColor="color_black "
                  name="supplier"
                  value={props.chemicalCredential.supplier}
                  handler={props.inputHandler}
                  //   readOnly={!chemicalCredential.isNew}
                />
              </div>
              <div className="col">
                <label>Chemical Type</label>
                <select
                  className="issue_content_container_top_input"
                  name="state"
                  value={props.chemicalCredential.state}
                  onChange={props.inputHandler}
                  //   readOnly={!chemicalCredential.isNew}
                  //   disabled={!chemicalCredential.isNew}
                  // required
                >
                  <option value="" disabled>
                    Please Choose...
                  </option>
                  <option value="SOLID">Solid</option>
                  <option value="LIQUID">Liquid</option>
                  <option value="GAS">Gas</option>
                </select>
              </div>
              <div className="col">
                <label>{`Quantity :  `}</label>
                <ShipmentInput
                  type="number"
                  labelShow={false}
                  placeholder={`Quantity`}
                  bckColor="color_black "
                  name="newQuantity"
                  value={props.chemicalCredential.newQuantity}
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
                    onClick={props.onClose}
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
    </>
  );
};

export default ChemicalModal;
