import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import Store from "../component/store/Store";
import UserManagment from "../component/userManagment/UserManagment";

import Add from "../pages/add/Add";
import Issue from "../component/issue/Issue";
import Location from "../component/location/Location";
import Search from "../component/search/Search";
import axios from "../axios/axios";

const Layout = () => {
  const [id, setId] = useState(0);
  const [storeList, setStoreList] = useState([]);
  let arr = [
    <Search />,
    <Add />,
    <Store />,
    <Location />,
    <Issue />,
    <UserManagment />,
  ];

  useEffect(() => {
    axios
      .get(`/api/management/stores/`)
      .then((res) => {
        setStoreList(res.data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  let pages = arr[id];
  const handlePage = (id) => {
    setId(id);
  };

  return (
    <>
      <Navigation />
      <div className="layout">
        <Sidebar handlePage={handlePage} storeList={storeList} />

        <div
          style={{
            width: "100%",
            height: "50rem",
          }}
        >
          {pages}
        </div>
      </div>
    </>
  );
};

export default Layout;
