import {useState} from "react";
import Modal from "../modal/Modal";
import ChemicalModal from "./ChemicalModal";
import AddChemical from "./AddChemical";
import AddInstrument from "./AddInstrument";
import AddGlassWare from "./AddGlassWare";
import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../../redux/Container";
import axios from "../../axios/axios";
import Textarea from "../input/Textarea";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {} from "../..";

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

const dummyInstrument = {
  name: "",
  manufacturer: "",
  supplier: "",
  quantity: "",
};

const dummyGlassware = {
  name: "",
  manufacturer: "",
  supplier: "",
  size: "",
  material_type: "",
  quantity: "",
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
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState({error: false, message: ""})
  const [notes, setNotes] = useState("");
  const notesHandler = (e) => setNotes(e.target.value);
  const [gotError, setGotError] = useState(false)

  ///// MAKE SERVER REQUEST
  const fuzzySearchHandler = (value, name) => {
    setFuzzySearch({options: [], isProcessing: true});
    let url = ``;
    if (name === "chemical")
      url = `/api/management/fuzzysearch/?type=chemical&query=${value}`;
    else if (name === "instrument") {
      url = `/api/management/fuzzysearch/?type=instrument&query=${value}`;
    } else url = `/api/management/fuzzysearch/?type=glassware&query=${value}`;
    axios
      .get(url)
      .then((res) => {
        setFuzzySearch({options: res.data, isProcessing: false});
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
    const {name, value} = e.target;
    fuzzySearchHandler(value, name);
    setChemicalCredential({...chemicalCredential, [name]: value});
  };

  //////IF ELEMENT EAIST THEN THEN CONSITIONALLY ADD THAT TYPE OF CREDENTIAL
  const foundChemicalHandler = (name, type, isNew, el = dummyChemical) => {
    console.log(el, isNew, type);
    const copyCredential = [...credential];

    if (type === "chemical" && isNew) {
      copyCredential.push({...el, type: "chemical", isNew});
    } else if (type === "chemical" && !isNew) {
      copyCredential.push({
        ...dummyChemical,
        name: name,
        type: "chemical",
        isNew,
      });
    } else if (type === "instrument" && isNew) {
      copyCredential.push({...el, type: "instrument", isNew});
    } else if (type === "instrument" && !isNew) {
      copyCredential.push({
        ...dummyInstrument,
        name: name,
        type: "instrument",
        isNew,
      });
    } else if (type === "glassWare" && isNew) {
      copyCredential.push({...el, type: "glassware", isNew});
    } else if (type === "glassWare" && !isNew) {
      copyCredential.push({
        ...dummyGlassware,
        name: name,
        type: "glassware",
        isNew,
      });
    }
    console.log(copyCredential);
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
    const {name, value} = e.target;
    editCredential[name] = value;
    copyCredential[index] = editCredential;
    setCredential(copyCredential);
  };

  //// SUBMIT SHIPMENT
  const submitShipmentHandler = () => {
    setLoading(true)
    const date = new Date();
    let finalObj = {
      shipment_date: `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()}`,
      note: notes,
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
          new: finalObj.chemical.new.push({
            ...item,
            store: process.env.REACT_APP_STORE_ID,
          }),
        };
      } else if (item.type === "chemical" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.chemical,
          old: finalObj.chemical.old.push({
            id: item.id,
            quantity: item.quantity,
          }),
        };
      } else if (item.type === "instrument" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.instrument,
          new: finalObj.instrument.new.push({
            ...item,
            store: process.env.REACT_APP_STORE_ID,
          }),
        };
      } else if (item.type === "instrument" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.instrument,
          old: finalObj.instrument.old.push({
            id: item.id,
            quantity: item.quantity,
          }),
        };
      } else if (item.type === "glassware" && !item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.glassware,
          new: finalObj.glassware.new.push({
            ...item,
            store: process.env.REACT_APP_STORE_ID,
          }),
        };
      } else if (item.type === "glassware" && item.isNew) {
        finalObj = {
          ...finalObj,
          ...finalObj.glassware,
          old: finalObj.glassware.old.push({
            id: item.id,
            quantity: item.quantity,
          }),
        };
      }
    }
    try {
      delete finalObj.new;
      delete finalObj.old;
    } catch {
    }

    setTimeout(() => {


      axios
        .post(`/api/management/add-shipment/`, finalObj)
        .then((res) => {
          setIsError({error: true, message: `Successfully Added Shipment`})
          if (res.data?.errors.length === 0)
            (() => toast(`Successfully Added Shipment`))()
          setCredential([])
          setLoading(false)
        })
        .catch((err) => {
          if (err.response.data?.errors.length > 0)
            (() => toast(`Please provide Valid Data.`))()
          setLoading(false)
          setIsError({error: true, message: "Please provide Valid Data."})
        });
    }, 1000)
  };

  ////////SHOW UI TO USER

  return (
    <>
      {isError.error && <ToastContainer/>}
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
      <div className="add_credential_container">
        <div className="add_credential_element_container">
          <div className="add_credential_notes_container">
            <Textarea
              placeholder="Notes ..."
              handler={notesHandler}
              value={notes}
            />
          </div>
          {/* CONDITIONALLY RENDERING  */}
          <div className="">
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
            {credential.length > 0 && (
              <button
                onClick={submitShipmentHandler}
                className="add_credential_submit_btn"
                disabled={loading}
              >
                Submit
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
