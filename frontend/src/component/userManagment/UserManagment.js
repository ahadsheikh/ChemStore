import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faLock,
  faPencilAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import SecondModal from "../modal/SecondModal";
import Input from "../input/Input";

const UserManagment = () => {
  const [show, setShow] = useState({
    password: false,
    edit: false,
    delete: false,
    newUser: false,
  });

  const handleClose = () =>
    setShow({
      password: false,
      edit: false,
      delete: false,
      newUser: false,
    });
  const handleShow = (name) => setShow({ ...show, [name]: !show[name] });
  return (
    <>
      <SecondModal
        show={show.password}
        handleClose={handleClose}
        handleShow={handleShow}
        info="Enter a new password for the user below."
        title="Reset Password"
        btn_text="Reset Password"
      >
        <div className="second_modal_main_container">
          <Input
            type="password"
            placeholder="New Password"
            bckColor="color_black "
          />
          <Input
            type="password"
            placeholder="Repeat Password"
            bckColor="color_black "
          />
        </div>
      </SecondModal>
      <SecondModal
        show={show.edit}
        handleClose={handleClose}
        handleShow={handleShow}
        info="The user's details are shown below."
        title="Edit User Information"
        btn_text="Save"
      >
        <div className="second_modal_main_container">
          <Input type="text" placeholder="E-Mail" bckColor="color_black" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "48%",
              }}
            >
              <Input
                type="text"
                placeholder="First Name"
                bckColor="color_black "
              />
            </div>
            <div
              style={{
                width: "48%",
              }}
            >
              <Input
                type="text"
                placeholder="Last Name"
                bckColor="color_black "
              />
            </div>
          </div>
        </div>
      </SecondModal>
      <SecondModal
        show={show.newUser}
        handleClose={handleClose}
        handleShow={handleShow}
        info="Please enter details for the new user below. A password will be 
        automatically generated and sent to the user on account creation."
        title="Create a New User"
        btn_text="Add User"
      >
        <div className="second_modal_main_container">
          <Input type="text" placeholder="E-Mail" bckColor="color_black" />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                width: "48%",
              }}
            >
              <Input
                type="text"
                placeholder="First Name"
                bckColor="color_black "
              />
            </div>
            <div
              style={{
                width: "48%",
              }}
            >
              <Input
                type="text"
                placeholder="Last Name"
                bckColor="color_black "
              />
            </div>
          </div>
          <Input
            type="password"
            placeholder="New Password"
            bckColor="color_black "
          />
          <Input
            type="password"
            placeholder="Repeat Password"
            bckColor="color_black "
          />
        </div>
      </SecondModal>
      <SecondModal
        show={show.delete}
        handleClose={handleClose}
        handleShow={handleShow}
        info="Are you sure you want to delete this user's account? 
        The user will be logged out of any sessions and will no longer be able to access the system."
        title="Delete User Account"
        btn_text="Delete"
      >
        <div className="second_modal_main_container">
          <p style={{ marginBottom: "0", textAlign: "center" }}>
            Elanor Allen (e.allen@cheminventory.net)
          </p>
        </div>
      </SecondModal>
      <div className="user_managment_table_wrapper">
        <div className="user_managment_table_main_header">
          <h3 className="user_managment_table_main_header_main_title">
            <FontAwesomeIcon icon={faUserAlt} />
            <span> User Accounts</span>
          </h3>
          <div>
            <button onClick={() => handleShow("newUser")}>
              <FontAwesomeIcon icon={faUserAlt} /> New User
            </button>
          </div>
        </div>
        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>

              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Otto</td>
                <td className="user_managment_table_body_row_data">
                  demo@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("password")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn detail"
                      onClick={() => handleShow("edit")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete")}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Jacob</td>
                <td className="user_managment_table_body_row_data">Thornton</td>
                <td className="user_managment_table_body_row_data">
                  e.allen@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div className="user_managment_action_btn">
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div className="user_managment_action_btn">
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div className="user_managment_action_btn">
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
              <tr className="user_managment_table_body_row">
                <td className="user_managment_table_body_row_data">Mark</td>
                <td className="user_managment_table_body_row_data">Thornton</td>
                <td className="user_managment_table_body_row_data">
                  d.fitz@cheminventory.net
                </td>
                <td className="user_managment_table_body_row_data">
                  <div className="user_managment_btn_container">
                    <div className="user_managment_action_btn">
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faLock}
                      />
                    </div>
                    <div className="user_managment_action_btn">
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div className="user_managment_action_btn">
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserManagment;
