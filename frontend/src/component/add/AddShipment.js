import {useSelector} from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import AddChemicalTest from "../addShipment/AddChemicalTest";
import AddInstrumentTest from "../addShipment/AddInstrumentTest";
import AddGlasswareTest from "../addShipment/AddGlasswareTest";

const AddShipment = (props) => {
  const {
    chemical: chemicalModal,
    instrument: instrumentModal,
    glassWare,
  } = useSelector((state) => state.container);

  ////////SHOW UI TO USER
  return (
    <>
      <div className="add_credential_container">
        <div className="add_credential_element_container">
          {chemicalModal && <AddChemicalTest/>}
          {instrumentModal && <AddInstrumentTest/>}
          {glassWare && <AddGlasswareTest/>}
        </div>
      </div>
    </>
  );
};

export default AddShipment;
