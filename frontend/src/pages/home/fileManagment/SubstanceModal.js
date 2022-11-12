import {Modal, Table} from "react-bootstrap";

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
            File to Substances
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{overflowX: "scroll"}}>
            <Table striped bordered hover>
              <thead>
              <tr>
                <th style={{paddingLeft: "2rem"}}>#</th>
                <th>CAS_RN</th>
                <th>Name</th>
                <th>Molecular Formula</th>
                <th>Molecular Weight</th>
                <th>Purity</th>
                <th>Quantity</th>
                <th>State</th>
                <th>Manufacturer</th>
                <th>Supplier</th>
              </tr>
              </thead>
              <tbody>
              {props.chemicals.map((el, i) => (
                <tr key={i}>
                  <td style={{paddingLeft: "2rem"}}>{i + 1}</td>
                  <th>{el.CAS_RN}</th>
                  <td>{el.name}</td>
                  <td>{el.molecular_formula}</td>
                  <td>{el.molecular_weight}</td>
                  <td>{el.purity}</td>
                  <td>{el.quantity}</td>
                  <td>{el.state}</td>
                  <td>{el.manufacturer}</td>
                  <td>{el.supplier}</td>
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
