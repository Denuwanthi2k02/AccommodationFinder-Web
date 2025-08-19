import React from "react";
import NavbarOwner from "../../components/Owner/NavbarOwner";

import { Outlet } from "react-router-dom";
import "./Layout.css";
import Sidebar from "../../components/Owner/Sidebar";

const Layout = () => {
  return (
    <div className="layout-container">
      <NavbarOwner />
      <div className="layout-body">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
