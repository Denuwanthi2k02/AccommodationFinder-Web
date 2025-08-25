import React, { useEffect } from "react";
import NavbarOwner from "../../components/Owner/NavbarOwner";

import { Outlet } from "react-router-dom";
import "./Layout.css";
import Sidebar from "../../components/Owner/Sidebar";
import { useAppContext } from "../../contex/AppContext";

const Layout = () => {
  const {isOwner,navigate} = useAppContext()
  useEffect(()=>{
    if(!isOwner){
      navigate('/')
    }

  },[isOwner])
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
