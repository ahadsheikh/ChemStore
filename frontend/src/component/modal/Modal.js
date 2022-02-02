const Modal = (props) => {
  return (
    <>
      <div
        className="popup"
        id="popup"
        style={{
          opacity: props.show ? "1" : "0",
          visibility: props.show ? "visible" : "hidden",
          zIndex: "90",
        }}
        onClick={props.handler}
      ></div>
      <div
        className="popup__content"
        style={{
          opacity: props.show ? "1" : "0",
          zIndex: "100",
          transform: props.show
            ? "translate(-50%, -50%) scale(1)"
            : "translate(-50%, -50%) scale(0)",
        }}
      >
        {props.children}
      </div>
    </>
  );
};

export default Modal;
