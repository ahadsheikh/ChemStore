import React, {useLayoutEffect} from 'react';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Error = (props) => {

    useLayoutEffect(() => {
        notify()
    }, [])
  const notify = () => toast.error(props.message);

  return (
    <div>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer />
    </div>
  );
}

export default Error