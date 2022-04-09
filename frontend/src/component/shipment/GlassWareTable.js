import React from "react";
import { Table } from "react-bootstrap";

const GlassWareTable = (props) => {
  return (
    <div>
      <div
        className="container mt-5 card bg-dark"
        style={{ overflowX: "scroll" }}
      >
        <p>Shipment Date: {props.item.date_time.substring(0, 10)}</p>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th style={{ paddingLeft: "2rem" }}>#</th>
              <th>Name</th>
              <th>Size</th>
              <th>Material Type</th>
              <th>Manufacturer</th>
              <th>Supplier</th>
              <th>Old Quantity</th>
              <th>New Quantity</th>
            </tr>
          </thead>
          <tbody>
            {props.flag &&
              props.item.glasswares.map((el, i) => (
                <tr key={i}>
                  <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.size}</td>
                  <td>{el.material_type}</td>
                  <td>{el.manufacturer}</td>
                  <td>{el.supplier}</td>
                  <td>{el.old_total}</td>
                  <td>{el.added_quantity}</td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default GlassWareTable;
