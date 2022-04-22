import React, { useState, useEffect } from "react";
import { Table, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import axios from "../../axios/axios";

const Store = () => {
  const { activeStore } = useSelector((state) => state.StoreManagment);
  const [error, setError] = useState({ loading: false, message: "" });
  const [chemical, setChemical] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [glassware, setGlassware] = useState([]);
  const [table, setTable] = useState({
    chemical: true,
    instrument: false,
    glassware: false,
  });
  const [flag, setFlag] = useState(false);

  const getChemical = () => {
    setError({ loading: true, message: "" });
    setTable({ chemical: true, instrument: false, glassware: false });
    axios
      .get(`/api/management/chemicals/`)
      .then((res) => {
        setChemical(res.data);
        setError({ loading: false, message: "" });
        setFlag(true);
      })
      .catch((err) => {
        setError({ loading: false, message: "Something Went Wrong" });
      });
  };

  const getInstrument = () => {
    setInstrument([]);
    setError({ loading: true, message: "" });
    setTable({ chemical: false, instrument: true, glassware: false });

    axios
      .get(`/api/management/instruments/`)
      .then((res) => {
        setInstrument(res.data);
        setError({ loading: false, message: "" });
        setFlag(true);
      })
      .catch((err) => {
        setError({ loading: false, message: "Something Went Wrong" });
      });
  };

  const getGlassware = () => {
    setGlassware([]);
    setError({ loading: true, message: "" });
    setTable({ chemical: false, instrument: false, glassware: true });
    axios
      .get(`/api/management/glasswares/`)
      .then((res) => {
        setGlassware(res.data);
        setError({ loading: false, message: "" });
        setFlag(true);
      })
      .catch((err) => {
        setError({ loading: false, message: "Something Went Wrong" });
      });
  };

  useEffect(() => {
    setError({ loading: true, message: "" });
    getChemical();
  }, [activeStore]);

  return (
    <div>
      <div className="container-md mt-5">
        <div className="show_shipment_container">
          <p
            style={{ backgroundColor: table.chemical && "#2d3133" }}
            onClick={() => getChemical()}
          >
            Chemical
          </p>
          <p
            style={{ backgroundColor: table.instrument && "#2d3133" }}
            onClick={() => getInstrument()}
          >
            Instrument
          </p>
          <p
            style={{ backgroundColor: table.glassware && "#2d3133" }}
            onClick={() => getGlassware()}
          >
            Glassware
          </p>
        </div>
      </div>
      <div className="container-md mt-5" style={{ overflowX: "scroll" }}>
        {/* {flag &&
          chemical.length === 0 &&
          instrument.length === 0 &&
          glassware.length === 0 && <p>Nothing Found</p>} */}
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              {table.chemical && (
                <tr>
                  <th style={{ paddingLeft: "2rem" }}>#</th>
                  <th>Name</th>
                  <th>Molecular Formula</th>
                  <th>Purity</th>
                  <th>Amount</th>
                  <th>State</th>
                  <th>Manufacturer</th>
                  <th>Supplier</th>
                </tr>
              )}
              {table.instrument && (
                <tr>
                  <th style={{ paddingLeft: "2rem" }}>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Manufacturer</th>
                  <th>Supplier</th>
                </tr>
              )}
              {table.glassware && (
                <tr>
                  <th style={{ paddingLeft: "2rem" }}>#</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Size</th>
                  <th>Type</th>
                  <th>Manufacturer</th>
                  <th>Supplier</th>
                </tr>
              )}
            </thead>
            <tbody>
              {error.loading && (
                <tr className="user_managment_table_loading_div">
                  <td colSpan="100%" className="text-center">
                    <Spinner
                      animation="border"
                      variant="light"
                      style={{
                        fontSize: "1rem",
                        height: "5rem",
                        width: "5rem",
                      }}
                    />
                  </td>
                </tr>
              )}
              {!error.loading &&
                table.chemical &&
                chemical.map((el, i) => (
                  <tr key={el.id}>
                    <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.molecular_formula}</td>
                    <td>{el.purity}</td>
                    <td>{el.quantity}</td>
                    <td>{el.state}</td>
                    <td>{el.manufacturer}</td>
                    <td>{el.supplier}</td>
                  </tr>
                ))}
              {table.instrument &&
                instrument.map((el, i) => (
                  <tr key={el.id}>
                    <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.quantity}</td>
                    <td>{el.manufacturer}</td>
                    <td>{el.supplier}</td>
                  </tr>
                ))}
              {table.glassware &&
                glassware.map((el, i) => (
                  <tr key={el.id}>
                    <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                    <td>{el.name}</td>
                    <td>{el.quantity}</td>
                    <td>{el.size}</td>
                    <td>{el.material_type}</td>
                    <td>{el.manufacturer}</td>
                    <td>{el.supplier}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Store;
