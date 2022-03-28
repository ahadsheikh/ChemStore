import React, { useState, useEffect } from "react";
import axios from "../../axios/axios";
import { Table, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faLock,
  faPencilAlt,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import SecondModal from "../modal/SecondModal";
import Input from "../input/Input";
import Header from "../add/Header";

const UserManagment = () => {
  const [show, setShow] = useState({
    password: false,
    edit: false,
    delete: false,
    newUser: false,
  });
  const [newUser, setNewUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm_password: "",
  });
  const [resp, setResp] = useState({
    message: "",
    loading: false,
    error: false,
  });
  const [response, setRespose] = useState({ loading: false });
  const [users, setUsers] = useState({ user: [], loading: false });
  const [user, setUser] = useState({});

  const handleClose = () => {
    setShow({
      password: false,
      edit: false,
      delete: false,
      newUser: false,
    });
    setUser({});
  };

  //// FOR SHOW MODAL
  const handleShow = (name, id, first_name, last_name, email) => {
    setUser({ id, first_name, last_name, email });
    setShow({ ...show, [name]: !show[name] });
  };

  const getUserFirstTimeHandler = () => {
    axios
      .get("/api/management/users/")
      .then((res) => {
        setUsers({ user: res.data, loading: false });
      })
      .catch((err) => {
        alert("Something Went Wrong.");
        setUsers({ user: [], loading: false });
      });
  };

  ///// FETCH DATA FOR THE VERY FIRST TIME
  useEffect(() => {
    setUsers({ user: [], loading: true });
    getUserFirstTimeHandler();
  }, []);

  //// FOR TAKING INPUT FROM USER
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const newUserInputHandler = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  ///// FOR UPDATEING USER
  const updateUserHandler = () => {
    
    setResp({ message: "", loading: true, error: false });
    axios
      .patch(`/api/management/users/${user.id}/`, user)
      .then((res) => {
        getUserFirstTimeHandler();
        handleClose();
        setResp({ message: "", loading: false, error: false });
      })
      .catch((err) => {
        setResp({
          message: "Something went wrong",
          loading: false,
          error: true,
        });
        console.log(err);
      });
  };

  //// FOR DELETE A USER
  const deleteUserHandler = () => {
    setResp({ message: "", loading: true, error: false });
    axios
      .delete(`/api/management/users/${user.id}/`)
      .then((res) => {
        getUserFirstTimeHandler();
        handleClose();
        setResp({ message: "", loading: false, error: false });
      })
      .catch((err) => {
        console.log(err);
        setResp({
          message: "Something Went Wrong",
          loading: false,
          error: false,
        });
      });
  };

  const createNewUserHandler = () => {
    setResp({ message: "", loading: true, error: false });
    axios
      .post(`/api/management/users/`, newUser)
      .then((res) => {
        getUserFirstTimeHandler();
        console.log(res);
        handleClose();
        setResp({ message: "", loading: false, error: false });
      })
      .catch((err) => {
        console.log(err.response);
        setResp({
          message: "Something Went Wrong",
          loading: false,
          error: false,
        });
      });
  };
  return (
    <>
      <SecondModal
        show={show.password}
        handleClose={handleClose}
        handleShow={handleShow}
        info="Enter a new password for the user below."
        title="Reset Password"
        btn_text="Reset Password"
        loading={resp.loading}
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
        submitHandler={updateUserHandler}
        loading={resp.loading}
      >
        <div className="second_modal_main_container">
          <Input
            type="text"
            placeholder="E-Mail"
            bckColor="color_black"
            name="email"
            value={user.email}
            handler={inputHandler}
          />
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
                name="first_name"
                value={user.first_name}
                handler={inputHandler}
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
                name="last_name"
                value={user.last_name}
                handler={inputHandler}
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
        submitHandler={createNewUserHandler}
        loading={resp.loading}
      >
        <div className="second_modal_main_container">
          <Input
            type="text"
            placeholder="E-Mail"
            bckColor="color_black"
            value={newUser.email}
            name="email"
            handler={newUserInputHandler}
          />
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
                value={newUser.first_name}
                name="first_name"
                handler={newUserInputHandler}
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
                value={newUser.last_name}
                name="last_name"
                handler={newUserInputHandler}
              />
            </div>
          </div>
          <Input
            type="password"
            placeholder="New Password"
            bckColor="color_black "
            value={newUser.password}
            name="password"
            handler={newUserInputHandler}
          />
          <Input
            type="password"
            placeholder="Repeat Password"
            bckColor="color_black "
            value={newUser.confirm_password}
            name="confirm_password"
            handler={newUserInputHandler}
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
        submitHandler={deleteUserHandler}
        loading={resp.loading}
      >
        <div className="second_modal_main_container">
          <p style={{ marginBottom: "0", textAlign: "center" }}>
            {user.first_name} {user.last_name} ({user.email})
            {/* Elanor Allen (e.allen@cheminventory.net) */}
          </p>
        </div>
      </SecondModal>
      <div className="user_managment_table_wrapper">
        <div>
          <Header text="User Accounts">
            <button
              className="central_header_remove_btn"
              onClick={() => handleShow("newUser")}
            >
              <FontAwesomeIcon icon={faUserAlt} /> <span> New User </span>
            </button>
          </Header>
        </div>

        <div>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th style={{ paddingLeft: "1rem" }}>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.loading && (
                <tr className="user_managment_table_loading_div">
                  <td colSpan={4} className="text-center">
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
              {!users.loading &&
                users.user.map((el) => (
                  <tr className="user_managment_table_body_row" key={el.id}>
                    <td
                      className="user_managment_table_body_row_data"
                      style={{ paddingLeft: "1rem" }}
                    >
                      {el.first_name}
                    </td>
                    <td className="user_managment_table_body_row_data">
                      {el.last_name}
                    </td>
                    <td className="user_managment_table_body_row_data">
                      {el.email}
                    </td>
                    <td className="user_managment_table_body_row_data">
                      <div className="user_managment_btn_container">
                        <button
                          disabled={el.is_superuser}
                          className="user_managment_action_btn detail"
                          onClick={() => handleShow("password")}
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "1.1rem" }}
                            icon={faLock}
                          />
                        </button>
                        <button
                        disabled={el.is_superuser}
                          className="user_managment_action_btn detail"
                          onClick={() =>
                            handleShow(
                              "edit",
                              el.id,
                              el.first_name,
                              el.last_name,
                              el.email
                            )
                          }
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "1.1rem" }}
                            icon={faPencilAlt}
                          />
                        </button>
                        <button
                        disabled={el.is_superuser}
                          className="user_managment_action_btn delete"
                          onClick={() =>
                            handleShow(
                              "delete",
                              el.id,
                              el.first_name,
                              el.last_name,
                              el.email
                            )
                          }
                        >
                          <FontAwesomeIcon
                            style={{ fontSize: "1.1rem" }}
                            icon={faTimes}
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserManagment;
