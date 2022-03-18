import React, { useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Error = (props) => {
  useEffect(() => {
    notify();
  }, []);
  const notify = () => toast(props.message);

  return (
    <div>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer />
    </div>
  );
};

export default Error;
