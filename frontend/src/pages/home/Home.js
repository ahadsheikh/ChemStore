import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import axios from "../../axios/axios";

const Home = () => {
  const [chemical, setChemical] = useState([]);
  const [instrument, setInstrument] = useState([]);
  const [glassware, setGlassware] = useState([]);
  const [table, setTable] = useState({
    chemical: true,
    instrument: false,
    glassware: false,
  });
  const getChemical = () => {
    setTable({ chemical: true, instrument: false, glassware: false });
    axios
      .get("/api/management/chemicals/")
      .then((res) => {
        setChemical(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getInstrument = () => {
    setTable({ chemical: false, instrument: true, glassware: false });
    axios
      .get("/api/management/instruments/")
      .then((res) => {
        setInstrument(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getGlassware = () => {
    setTable({ chemical: false, instrument: false, glassware: true });
    axios
      .get("/api/management/glasswares/")
      .then((res) => {
        setGlassware(res.data);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getChemical();
  }, []);
  return (
    <div className="user_managment_table_wrapper">
      <div className="user_managment_table_main_header">
        <h3 className="user_managment_table_main_header_main_title">
          {/* <FontAwesomeIcon icon={faUserAlt} /> */}
          {table.chemical && <span> Chemicals</span>}
          {table.instrument && <span> Instrument</span>}
          {table.glassware && <span> Glass Ware</span>}
        </h3>
        <div>
          <Dropdown>
            <Dropdown.Toggle
              variant="Secondary"
              style={{ padding: ".8rem 1rem", backgroundColor: "black" }}
              id="dropdown-basic"
            >
              Change Material Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                style={{ fontSize: "1.6rem" }}
                onClick={getChemical}
              >
                Chemical
              </Dropdown.Item>
              <Dropdown.Item
                style={{ fontSize: "1.6rem" }}
                onClick={getInstrument}
              >
                Instrument
              </Dropdown.Item>
              <Dropdown.Item
                style={{ fontSize: "1.6rem" }}
                onClick={getGlassware}
              >
                Glass Ware
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
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
            {table.chemical &&
              chemical.map((el, i) => (
                <tr key={el.id}>
                  <td style={{ paddingLeft: "2rem" }}>{i + 1}</td>
                  <td>{el.name}</td>
                  <td>{el.molecular_formula}</td>
                  <td>{el.purity}</td>
                  <td>{el.amount}</td>
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
  );
};

export default Home;
