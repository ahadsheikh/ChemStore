import { useState } from "react";
import Button from "../button/Button";
import Modal from "../modal/Modal";
import ChemicalModal from "./ChemicalModal";
import AddChemical from "./AddChemical";
import AddInstrument from "./AddInstrument";
import AddGlassWare from "./AddGlassWare";
import CollapseItem from "../collapse/CollapseItem";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/Container";

const chemical = [
  { name: "oxygen", weight: 0, group: "a" },
  { name: "Hydrozen", weight: 0, group: "a" },
  { name: "H20", weight: 0, group: "a" },
  { name: "oxygen", weight: 0, group: "a" },
  { name: "Hydrozen", weight: 0, group: "a" },
  { name: "H20", weight: 0, group: "a" },
  { name: "oxygen", weight: 0, group: "a" },
  { name: "Hydrozen", weight: 0, group: "a" },
  { name: "H20", weight: 0, group: "a" },
  { name: "oxygen", weight: 0, group: "a" },
];

const instrument = [
  { name: "Tube", weight: 0, group: "a" },
  { name: "Drop", weight: 0, group: "a" },
  { name: "H20", weight: 0, group: "a" },
];
const glass = [
  { name: "glass", weight: 0, group: "a" },
  { name: "Shoe", weight: 0, group: "a" },
  { name: "Wrapon", weight: 0, group: "a" },
];

const Main = () => {
  const dispatch = useDispatch();
  const {
    chemical: chemicalModal,
    instrument: instrumentModal,
    glassWare,
  } = useSelector((state) => state.container);

  //////STATES
  const [openModal, setOpenModal] = useState({
    chemical: false,
    instrument: false,
    glassWare: false,
  });
  const [credential, setCredential] = useState([]);
  const [chemicalCredential, setChemicalCredential] = useState({
    chemical: "",
    instrument: "",
    glassWare: "",
  });

  //////OPEN MODEL
  const openModalHandler = (open) => {
    setOpenModal({ ...openModal, [open]: !openModal[open] });
  };

  ////CLOSE MODEL
  const closeModalHandler = () => {
    dispatch(closeModal());
    // setOpenModal({ chemical: false, instrument: false, glassWare: false });
    setChemicalCredential({
      chemical: "",
      instrument: "",
      glassWare: "",
    });
  };

  ///////HANDLE USER INPUT
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setChemicalCredential({ ...chemicalCredential, [name]: value });
  };

  //////IF ELEMENT EAIST THEN THEN CONSITIONALLY ADD THAT TYPE OF CREDENTIAL
  const foundChemicalHandler = (name, type) => {
    const copyCredential = [...credential];
    let item;
    if (type === "chemical") {
      item = chemical.find((el) => el.name === name);
      copyCredential.push({ ...item, type: "chemical" });
    } else if (type === "instrument") {
      item = instrument.find((el) => el.name === name);
      copyCredential.push({ ...item, type: "instrument" });
    } else {
      item = glass.find((el) => el.name === name);
      copyCredential.push({ ...item, type: "glassware" });
    }

    setCredential(copyCredential);
    closeModalHandler();
  };

  ////////Remove Credential Handler
  const removeCredentialHandler = (index) => {
    const copyCredential = [...credential];
    copyCredential.splice(index, 1);
    setCredential(copyCredential);
  };

  ////////SHOW UI TO USER

  return (
    <>
      {/* MODAL FOR ADDING CHEMICAL */}
      <Modal show={chemicalModal} handler={closeModalHandler}>
        <ChemicalModal
          name="chemical"
          placeholder="Chemical"
          value={chemicalCredential.chemical}
          inputHandler={inputHandler}
          foundChemicalHandler={foundChemicalHandler}
          options={chemical}
        />
      </Modal>
      {/* MODAL FOR ADDING INSTRUMENT */}
      <Modal show={instrumentModal} handler={closeModalHandler}>
        <ChemicalModal
          name="instrument"
          placeholder="Instrument...."
          value={chemicalCredential.instrument}
          inputHandler={inputHandler}
          foundChemicalHandler={foundChemicalHandler}
          options={instrument}
        />
      </Modal>
      {/* MODAL FOR ADDING GLASS WARE */}
      <Modal show={glassWare} handler={closeModalHandler}>
        <ChemicalModal
          name="glassWare"
          placeholder="Glass Ware...."
          value={chemicalCredential.glassWare}
          inputHandler={inputHandler}
          foundChemicalHandler={foundChemicalHandler}
          options={glass}
        />
      </Modal>
      <div>
        {/* CONDITIONALLY RENDERING  */}
        <div>
          {credential.map((el, i) => {
            if (el.type === "chemical") {
              return (
                <AddChemical
                  key={i}
                  removeHandler={() => removeCredentialHandler(i)}
                  value={chemicalCredential.chemical}
                  options={chemical}
                />
              );
            } else if (el.type === "instrument") {
              return (
                <AddInstrument
                  key={i}
                  removeHandler={() => removeCredentialHandler(i)}
                />
              );
            } else if (el.type === "glassware") {
              return (
                <AddGlassWare
                  key={i}
                  removeHandler={() => removeCredentialHandler(i)}
                />
              );
            }
          })}
        </div>
      </div>
    </>
  );
};

export default Main;
