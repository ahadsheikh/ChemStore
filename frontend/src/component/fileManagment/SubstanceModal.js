import { useState } from "react";
import { Modal, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const SubstanceModal = (props) => {
  return (
    <>
      <Modal
        size="xl"
        show={props.show}
        onHide={props.onHideHandler}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Link File to Substances
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p
            onClick={props.showAddLinkModal}
            className="text-end substance_modal_add_link"
          >
            Add Links
          </p>
          <div style={{ overflowX: "scroll" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ paddingLeft: "2rem" }}>#</th>
                  <th>CAS_RN</th>
                  <th>Name</th>
                  <th>Molecular Formula</th>
                  <th>Molecular Weight</th>
                  <th>Purity</th>
                  <th>Quantity</th>
                  <th>State</th>
                  <th>Manufacturer</th>
                  <th>Supplier</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {props.chemicals.map((el, i) => (
                  <tr key={el.CAS_RN}>
                    <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                    <th>{el.CAS_RN}</th>
                    <td>{el.name}</td>
                    <td>{el.molecular_formula}</td>
                    <td>{el.molecular_weight}</td>
                    <td>{el.purity}</td>
                    <td>{el.quantity}</td>
                    <td>{el.state}</td>
                    <td>{el.manufacturer}</td>
                    <td>{el.supplier}</td>
                    <td>
                      <button
                        onClick={() =>
                          props.deleteChemicalHandler(
                            i,
                            props.data.chemicals,
                            props.data.id
                          )
                        }
                        className="bg-danger user_managment_action_btn detail"
                      >
                        <FontAwesomeIcon
                          style={{ fontSize: "1.1rem" }}
                          icon={faTrash}
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SubstanceModal;
