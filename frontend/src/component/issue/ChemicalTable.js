import React from "react";
import {Table, Button} from "react-bootstrap";

const ChemicalTable = (props) => {
  return (
    <>
      {/* <div className="border mt-5"></div> */}
      <div className="container mt-5" style={{overflowX: "scroll"}}>
        <Table striped bordered hover variant="dark">
          <thead>
          <tr>
            <th style={{paddingLeft: "2rem"}}>#</th>
            <th>Name</th>
            <th>Molecular Formula</th>
            <th>Molecular Weight</th>
            <th>Purity</th>
            <th>Quantity</th>
            <th>State</th>
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
              <td>{el.object.chemical.name}</td>
              <td>{el.object.chemical.molecular_formula}</td>
              <td>{el.object.chemical.molecular_weight}</td>
              <td>{el.object.purity}</td>
              <td>{el.object.quantity}</td>
              <td>{el.object.state}</td>
              <td>{el.object.manufacturer.name}</td>
              <td>{el.object.supplier.name}</td>
              <td>{el.quantity}</td>
              <td>
                <div>
                  <Button
                    variant="primary"
                    onClick={() => props.editHandler(el)}
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

      {/* <div className="clearfix">
        <button
          onClick={submitHandler}
          className="btn btn-primary mt-4 px-4 float-end fontSize1_6"
          disabled={submitLoading}
        >
          {submitLoading && (
            <div className="spinner-border me-2" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          )}
          Submit
        </button>
      </div> */}
    </>
  );
};

export default ChemicalTable;
