import React, { useState, useEffect } from "react";
import axios from '../../axios/axios'
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
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})

  const handleClose = () => {
    setShow({
      password: false,
      edit: false,
      delete: false,
      newUser: false,
    });
    setUser({});
  }
    
  //// FOR SHOW MODAL
  const handleShow = (name, id, first_name, last_name, email) => {
    setUser({id, first_name, last_name, email});
    setShow({ ...show, [name]: !show[name] })
  };

  ///// FETCH DATA FOR THE VERY FIRST TIME
  useEffect(() => {
    axios.get('/api/management/users/').then(res => {
      setUsers(res.data)
    }).catch(err => {
      alert('Something Went Wrong.')
    })
  }, [])

  //// FOR TAKING INPUT FROM USER
  const inputHandler = (e) => {
    const {name, value} = e.target
    console.log(name, value)
    setUser({...user, [name]: value})
  }

  ///// FOR UPDATEING USER 
  const updateUserHandler = () => {
    axios.patch(`/api/management/users/${user.id}/`, user).then(res => {
      console.log(res)
      handleClose();
    }).catch(err => {
      console.log(err)
    })
  }

  //// FOR DELETE A USER
  const deleteUserHandler = () => {
    axios.delete(`/api/management/users/${user.id}/`).then(res => {
      console.log(res)
      handleClose()
    }).catch(err => {
      console.log(err)
    })
  }
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
        submitHandler={updateUserHandler}
      >
        <div className="second_modal_main_container">
          <Input type="text" placeholder="E-Mail" bckColor="color_black" name="email" value={user.email} handler={inputHandler} />
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
                value={user.first_name} handler={inputHandler}
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
                value={user.last_name} handler={inputHandler}
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
        submitHandler={deleteUserHandler}
      >
        <div className="second_modal_main_container">
          <p style={{ marginBottom: "0", textAlign: "center" }}>
            {user.first_name} {user.last_name} ({user.email})
            {/* Elanor Allen (e.allen@cheminventory.net) */}
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
            {users.map(el =>               
            <tr className="user_managment_table_body_row" key={el.id}>
                <td className="user_managment_table_body_row_data">{el.first_name}</td>
                <td className="user_managment_table_body_row_data">{el.last_name}</td>
                <td className="user_managment_table_body_row_data">
                 {el.email}
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
                      onClick={() => handleShow("edit", el.id,el.first_name, el.last_name, el.email)}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faPencilAlt}
                      />
                    </div>
                    <div
                      className="user_managment_action_btn delete"
                      onClick={() => handleShow("delete", el.id,el.first_name, el.last_name, el.email)}
                    >
                      <FontAwesomeIcon
                        style={{ fontSize: "1.1rem" }}
                        icon={faTimes}
                      />
                    </div>
                  </div>
                </td>
              </tr>)}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default UserManagment;
