import React from "react";
import { Table } from "react-bootstrap";
import Input from "../input/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Header from "../add/Header";
import ShipmentInput from "./ShipmentInput";

const AddChemicalTest = (props) => {
  return (
    <div className="chemical_add_wrapper">
      <div className="chemical_add_container">
        <div className="chemical_div">
          <input
            name="chemical"
            placeholder="Chemical"
            value={props.searchInputvalue}
            onChange={props.inputHandler}
          />
          <button onClick={() =>
                      props.foundChemicalHandler(props.searchInputvalue, 'chemical', false, props.value)
                    }>Create</button>
        </div>
        <div className="fuzzy_search_div_chemical">
          {props.searchInputvalue.length > 0 && (
            <ul className="model_suggestion_ul">
              {props.isProcessing ? (
                <p>loading..........</p>
              ) : (
                props.options.map((el) => (
                  <li
                    key={el.name}
                    onClick={() =>
                      props.foundChemicalHandler(el.name, 'chemical', true, el)
                    }
                  >
                    {el.name}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
      <div className="add_chemical_container">
        <Header text="Add Chemical">
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
                    type="text"
                    placeholder="Name"
                    bckColor="color_black "
                    name="name"
                    value={props.value.name}
                    handler={props.handler}
                  />
                </div>
              </div>
            </div>
            <div className="container-fluid">
              <div className="row row-cols-1 row-cols-sm-2">
                <div className="col">
                  <ShipmentInput
                    type="text"
                    placeholder="CAS RN"
                    bckColor="color_black "
                    name="CAS_RN"
                    value={props.value.CAS_RN}
                    handler={props.handler}
                  />
                </div>
                <div className="col">
                  <ShipmentInput
                    type="text"
                    placeholder="Moliqular Formula"
                    bckColor="color_black "
                    name="molecular_formula"
                    value={props.value.molecular_formula}
                    handler={props.handler}
                  />
                </div>
                <div className="col">
                  <ShipmentInput
                    type="text"
                    placeholder="Moliqular Weight"
                    bckColor="color_black "
                    name="molecular_weight"
                    value={props.value.molecular_weight}
                    handler={props.handler}
                  />
                </div>
                <div className="col">
                  <ShipmentInput
                    type="text"
                    placeholder="Purity"
                    bckColor="color_black "
                    name="purity"
                    value={props.value.purity}
                    handler={props.handler}
                  />
                </div>
                <div className="col">
                  <ShipmentInput
                    type="text"
                    placeholder="Manufacturer"
                    bckColor="color_black "
                    name="manufacturer"
                    value={props.value.manufacturer}
                    handler={props.handler}
                  />
                </div>
                <div className="col">
                  <ShipmentInput
                    type="text"
                    placeholder="Supplier"
                    bckColor="color_black "
                    name="supplier"
                    value={props.value.supplier}
                    handler={props.handler}
                  />
                </div>
                <div className="col">
                  <label>Chemical Type</label>
                  <select
                    className="issue_content_container_top_input"
                    name="state"
                    value={props.value.state}
                    onChange={props.handler}
                    // value={props.valueObj.state}
                    // onChange={props.handler}
                    // disabled={props.readOnly}
                    // required
                  >
                    <option value="" disabled selected>
                      Please Choose...
                    </option>
                    <option value="SOLID">Solid</option>
                    <option value="LIQUID">Liquid</option>
                    <option value="GAS">Gas</option>
                  </select>
                </div>
                <div className="col">
                  <ShipmentInput
                    type="number"
                    placeholder="Amount"
                    bckColor="color_black "
                    name="quantity"
                    value={props.value.quantity}
                    handler={props.handler}
                  />
                </div>
              </div>
              <button onClick={props.checkHandler}>Add</button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5" style={{ overflowX: "scroll" }}>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={{ paddingLeft: "2rem" }}>#</th>
              <th>Name</th>
              <th>Molecular Formula</th>
              <th>Purity</th>
              <th>Amount</th>
              <th>State</th>
              <th>Manufacturer</th>
              <th>Supplier</th>
            </tr>
          </thead>
          <tbody>
            {props.chemicals.map((el, i) => (
              <tr key={el.id}>
                <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                <td>{el.name}</td>
                <td>{el.molecular_formula}</td>
                <td>{el.purity}</td>
                <td>{el.amount}</td>
                <td>{el.state}</td>
                <td>{el.manufacturer}</td>
                <td>{el.supplier}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* <div className="store_managment_table_wrapper">
        <div className="user_managment_table_main_header ">
          <h3 className="user_managment_table_main_header_main_title  padding-small">
            Chemicals
          </h3>
        </div>
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th style={{ paddingLeft: "2rem" }}>#</th>
                <th>Name</th>
                <th>Molecular Formula</th>
                <th>Purity</th>
                <th>Amount</th>
                <th>State</th>
                <th>Manufacturer</th>
                <th>Supplier</th>
              </tr>
            </thead>
            <tbody> */}
      {/* {error.loading && (
                  <tr className="user_managment_table_loading_div">
                    <td colSpan="100%" className="text-center">
                      <Spinner
                        animation="border"
                        variant="light"
                        style={{
                          fontSize: "1rem",
                          height: "5rem",
                          width: "5rem",
                        }}
                      />
                    </td>
                  </tr>
                )}
                {!error.loading &&
                  table.chemical &&
                  chemical.map((el, i) => (
                    <tr key={el.id}>
                      <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                      <td>{el.name}</td>
                      <td>{el.molecular_formula}</td>
                      <td>{el.purity}</td>
                      <td>{el.amount}</td>
                      <td>{el.state}</td>
                      <td>{el.manufacturer}</td>
                      <td>{el.supplier}</td>
                    </tr>
                  ))}
                
                
                  ))} */}
      {/* </tbody>
          </Table> */}
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default AddChemicalTest;
