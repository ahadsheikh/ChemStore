import { useState } from "react";
import Modal from "../modal/Modal";
import ChemicalModal from "./ChemicalModal";
import AddChemical from "./AddChemical";
import AddInstrument from "./AddInstrument";
import AddGlassWare from "./AddGlassWare";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/Container";
import axios from "../../axios/axios";

// const chemical = [
//   { name: "oxygen", weight: 0, group: "a" },
//   { name: "Hydrozen", weight: 0, group: "a" },
//   { name: "H20", weight: 0, group: "a" },
//   { name: "oxygen", weight: 0, group: "a" },
//   { name: "Hydrozen", weight: 0, group: "a" },
//   { name: "H20", weight: 0, group: "a" },
//   { name: "oxygen", weight: 0, group: "a" },
//   { name: "Hydrozen", weight: 0, group: "a" },
//   { name: "H20", weight: 0, group: "a" },
//   { name: "oxygen", weight: 0, group: "a" },
// ];

const dummyChemical = {
  CAS_RN: "",
  amount: "",
  isNew: false,
  manufacturer: "",
  molecular_formula: "",
  molecular_weight: "",
  name: "",
  purity: "",
  state: "",
  supplier: "",
  type: "",
};

const Main = (props) => {
  const dispatch = useDispatch();
  const {
    chemical: chemicalModal,
    instrument: instrumentModal,
    glassWare,
  } = useSelector((state) => state.container);

  const [fuzzySearch, setFuzzySearch] = useState({
    options: [],
    isProcessing: false,
  });
  const [credential, setCredential] = useState([]);
  const [chemicalCredential, setChemicalCredential] = useState({
    chemical: "",
    instrument: "",
    glassWare: "",
  });

  ///// MAKE SERVER REQUEST
  const fuzzySearchHandler = (value, name) => {
    setFuzzySearch({ options: [], isProcessing: true });
    let url = ``;
    if (name === "chemical")
      url = `/api/management/fuzzysearch/?type=chemical&query=${value}`;
    else if (name === "instrument") {
      url = `/api/management/fuzzysearch/?type=instrument&query=${value}`;
    } else url = `/api/management/fuzzysearch/?type=glassware&query=${value}`;
    axios
      .get(url)
      .then((res) => {
        setFuzzySearch({ options: res.data, isProcessing: false });
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  ////CLOSE MODEL
  const closeModalHandler = () => {
    dispatch(closeModal());
    setChemicalCredential({
      chemical: "",
      instrument: "",
      glassWare: "",
    });
    setFuzzySearch([]);
  };

  ///////HANDLE USER INPUT
  const inputHandler = (e) => {
    const { name, value } = e.target;
    fuzzySearchHandler(value, name);
    setChemicalCredential({ ...chemicalCredential, [name]: value });
  };

  //////IF ELEMENT EAIST THEN THEN CONSITIONALLY ADD THAT TYPE OF CREDENTIAL
  const foundChemicalHandler = (name, type, isNew, el = dummyChemical) => {
    const copyCredential = [...credential];
    if (!isNew) {
      el.name = name;
    }
    if (type === "chemical") {
      copyCredential.push({ ...el, type: "chemical", isNew });
    } else if (type === "instrument") {
      copyCredential.push({ ...el, type: "instrument", isNew });
    } else {
      copyCredential.push({ ...el, type: "glassware", isNew });
    }
    setFuzzySearch([]);
    setCredential(copyCredential);
    closeModalHandler();
  };

  ////////Remove Credential Handler
  const removeCredentialHandler = (index) => {
    const copyCredential = [...credential];
    copyCredential.splice(index, 1);
    setCredential(copyCredential);
  };

  //INPUT
  const inputDataHandler = (e, index) => {
    let copyCredential = [...credential];
    let editCredential = copyCredential[index];
    const { name, value } = e.target;
    editCredential[name] = value;
    copyCredential[index] = editCredential;
    setCredential(copyCredential);
  };

  //// SUBMIT SHIPMENT
  const submitShipmentHandler = () => {
    let finalObj = {
      shipment_date: Date.now(),
      note: "This is a great shipment",
      chemical: {
        old: [],
        new: [],
      },
      glassware: {
        old: [],
        new: [],
      },
      instrument: {
        old: [],
        new: [],
      },
    };
    let copyCredential = [...credential];

    for (let item of copyCredential) {
      if (item.type === "chemical" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.chemical,
          new: finalObj.chemical.new.push(item),
        };
      } else if (item.type === "chemical" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.chemical,
          old: finalObj.chemical.old.push({ id: item.id, amount: item.amount }),
        };
      } else if (item.type === "instrument" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.instrument,
          new: finalObj.instrument.new.push(item),
        };
      } else if (item.type === "instrument" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.instrument,
          old: finalObj.instrument.old.push({
            id: item.id,
            amount: item.amount,
          }),
        };
      } else if (item.type === "glassware" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.glassware,
          new: finalObj.glassware.new.push(item),
        };
      } else if (item.type === "glassware" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.glassware,
          old: finalObj.glassware.old.push({
            id: item.id,
            amount: item.amount,
          }),
        };
      }
    }
    try {
      delete finalObj.new;
      delete finalObj.old;
    } catch {}

    console.log(finalObj);
  };

  ////////SHOW UI TO USER
  const checkDataHandler = () => {
    console.log(credential);
  };

  return (
    <>
      {/* MODAL FOR ADDING CHEMICAL */}
      {/* <button onClick={checkDataHandler}>Check</button>
      <button onClick={submitShipmentHandler}>Submit</button> */}
      <Modal show={chemicalModal} handler={closeModalHandler}>
        <ChemicalModal
          name="chemical"
          placeholder="Chemical"
          value={chemicalCredential.chemical}
          inputHandler={inputHandler}
          foundChemicalHandler={foundChemicalHandler}
          options={fuzzySearch.options}
          isProcessing={fuzzySearch.isProcessing}
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
          options={fuzzySearch.options}
          isProcessing={fuzzySearch.isProcessing}
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
          options={fuzzySearch.options}
          isProcessing={fuzzySearch.isProcessing}
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
                  handler={(e) => inputDataHandler(e, i)}
                  valueObj={el}
                  readOnly={el.isNew}
                  value={chemicalCredential.chemical}
                  // options={chemical}
                />
              );
            } else if (el.type === "instrument") {
              return (
                <AddInstrument
                  key={i}
                  removeHandler={() => removeCredentialHandler(i)}
                  handler={(e) => inputDataHandler(e, i)}
                  valueObj={el}
                  readOnly={el.isNew}
                  value={chemicalCredential.instrument}
                />
              );
            } else if (el.type === "glassware") {
              return (
                <AddGlassWare
                  key={i}
                  removeHandler={() => removeCredentialHandler(i)}
                  handler={(e) => inputDataHandler(e, i)}
                  valueObj={el}
                  readOnly={el.isNew}
                  value={chemicalCredential.glassWare}
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
