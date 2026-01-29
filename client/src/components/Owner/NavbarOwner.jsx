import React from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import "./NavbarOwner.css";
import { useAppContext } from "../../contex/AppContext";

const NavbarOwner = () => {
  const {user} = useAppContext()

  return (
    <div className="navbar-owner">
      <Link to="/">
        <img src={assets.logo} alt="Logo" className="owner-navbar-logo" />
      </Link>
      <p className="navbar-welcome">Welcome, {user?.name || "Owner"}</p>
    </div>
  );
};

export default NavbarOwner;
