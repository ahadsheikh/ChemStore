import {Modal} from "react-bootstrap";

const AddLinkModal = (props) => {
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.onHide}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title">
            Add Substance Links
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input
              class="form-control"
              style={{fontSize: "1.6rem"}}
              placeholder="Search"
              onChange={props.inputHandler}
              value={props.value}
            />
            <ul className="add_link_modal_ul">
              {props.fuzzyResult.map((el, i) => (
                <li key={i}>
                  <span>{el.name}</span>{" "}
                  <span
                    onClick={() => props.handler(el, props.data.id)}
                    className="add_link"
                  >
                    Add Link
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddLinkModal;
