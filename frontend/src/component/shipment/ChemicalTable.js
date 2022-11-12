import React from "react";
import {Table} from "react-bootstrap";

const ChemicalTable = (props) => {
  return (
    <div className="container mt-5 card bg-dark" style={{overflowX: "scroll"}}>
      <p>Shipment Date: {props.item.date_time.substring(0, 10)}</p>
      <Table striped bordered hover variant="dark">
        <thead>
        <tr>
          <th style={{paddingLeft: "2rem"}}>#</th>
          <th>CAS_RN</th>
          <th>Name</th>
          <th>Molecular Formula</th>
          <th>Molecular Weight</th>
          <th>Purity</th>
          <th>Old Quantity</th>
          <th>State</th>
          <th>Manufacturer</th>
          <th>Supplier</th>
          <th>Added Quantity</th>
        </tr>
        </thead>
        <tbody>
        {props.flag &&
          props.item.chemicals.map((el, i) => (
            <tr key={el.CAS_RN}>
              <td style={{paddingLeft: "2rem"}}>{i + 1}</td>
              <th>{el.CAS_RN}</th>
              <td>{el.name}</td>
              <td>{el.molecular_formula}</td>
              <td>{el.molecular_weight}</td>
              <td>{el.purity}</td>
              <td>{el.old_total}</td>
              <td>{el.state}</td>
              <td>{el.manufacturer}</td>
              <td>{el.supplier}</td>
              <td>{el.added_quantity}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ChemicalTable;
