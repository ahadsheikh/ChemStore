import { Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";

const SecondModal = (props) => {
  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <div className="second_modal_container">
          <div className="second_modal_header_container">
            <div>
              <h4>
                <FontAwesomeIcon icon={faInfoCircle} />{" "}
                <span className="second_modal_header_container_title">
                  {props.title}
                </span>
              </h4>
              <FontAwesomeIcon
                onClick={props.handleClose}
                icon={faTimes}
                className="second_modal_header_container_close_icon"
              />
            </div>
            <p className="second_modal_header_container_second_title">
              {props.info}
            </p>
          </div>
          {props.children}
          <div className="second_modal_btn_container">
            <button
              className="second_modal_btn color_primary3"
              onClick={props.submitHandler}
            >
              {props.btn_text}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SecondModal;
