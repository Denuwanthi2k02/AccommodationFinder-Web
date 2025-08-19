import React from "react";
import { assets, dummyOwnerData } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./NavbarOwner.css";

const NavbarOwner = () => {
  const user = dummyOwnerData;

  return (
    <div className="navbar-owner">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="owner-navbar-logo" />
      </Link>
      <p className="navbar-welcome">Welcome, {user.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
