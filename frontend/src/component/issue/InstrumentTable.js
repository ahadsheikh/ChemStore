import React from "react";
import {Table, Button} from "react-bootstrap";

const InstrumentTable = (props) => {
  return (
    <>
      {/* <div className="border mt-5"></div> */}
      <div className="container mt-5" style={{overflowX: "scroll"}}>
        <Table striped bordered hover variant="dark">
          <thead>
          <tr>
            <th style={{paddingLeft: "2rem"}}>#</th>
            <th>Name</th>
            <th>Quantity</th>
            <th>Manufacturer</th>
            <th>Supplier</th>
            <th>Issue Quantity</th>
            <th>Action</th>
          </tr>
          </thead>
          <tbody>
          {props.item.map((el, i) => (
            <tr key={el.id}>
              <td style={{paddingLeft: "2rem"}}>{i + 1}</td>
              <td>{el.object.instrument.name}</td>
              <td>{el.object.quantity}</td>
              <td>{el.object.manufacturer.name}</td>
              <td>{el.object.supplier.name}</td>
              <td>{el.quantity}</td>
              <td>
                <div>
                  <Button
                    onClick={() => props.editHandler(el)}
                    variant="primary"
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => props.deleteHandler(el.id)}
                    disabled={
                      el.id === props.deleteLoading.id &&
                      props.deleteLoading.loading
                    }
                  >
                    {el.id === props.deleteLoading.id &&
                      props.deleteLoading.loading && (
                        <div
                          className="spinner-border spinner-border-sm me-2"
                          role="status"
                        >
                          <span className="visually-hidden">Loading...</span>
                        </div>
                      )}
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default InstrumentTable;
