import React, { useState } from "react";
import Navigation from "./Navigation";
import Sidebar from "./Sidebar";
import Contemt from "./Contemt";
import UserManagment from "../component/userManagment/UserManagment";

import Add from "../pages/add/Add";
import Issue from "../component/issue/Issue";
import Location from "../component/location/Location";

const Layout = () => {
  const [id, setId] = useState(0);
  let arr = [<Contemt />, <Add />, <Location />, <Issue />, <UserManagment />];
  let pages = arr[id];
  const handlePage = (id) => {
    setId(id);
  };
  return (
    <>
      <Navigation />
      <div className="layout">
        <Sidebar handlePage={handlePage} />

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
