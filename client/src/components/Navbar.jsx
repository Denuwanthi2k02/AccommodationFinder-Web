import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import "./Navbar.css";
import {useAppContext} from '../contex/AppContext'
import toast from "react-hot-toast";

const Navbar = () => {

  const{setShowLogin,user,logout,isOwner,axios,setIsOwner}= useAppContext()
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const changeRole =async ()=>{
    try {
     const {data} = await axios.post('/api/owner/change-role')
     if(data.success){
      setIsOwner (true)
      toast.success(data.message)
     }else{
      toast.error(data.message)
     }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div
      className={`navbar-container ${
        location.pathname === "/" ? "bg-light" : ""
      }`}
    >
      <Link to="/">
        <img src={assets.logo} alt="logo" className="navbar-logo" />
      </Link>

      {/* Links & Search Section */}
      <div
        className={`navbar-links ${
          location.pathname === "/" ? "bg-light" : "bg-white"
        } ${open ? "menu-open" : "menu-closed"}`}
      >
        {/* Navigation Links */}
        {menuLinks.map((link, index) => (
          <Link key={index} to={link.path} className="navbar-link">
            {link.name}
          </Link>
        ))}

        {/* Search Input */}
        <div className="navbar-search-container hidden-lg-flex">
          <input
            type="text"
            className="navbar-search-input"
            placeholder="Search Accommodation"
          />
          <img
            src={assets.search_icon}
            alt="Search"
            className="navbar-search-icon"
          />
        </div>

        {/* Buttons Section */}
        <div className="navbar-button-group">
          <img
              src={assets.account}
              alt="Account"
              className="navbar-account-icon"
            />
          <button
            onClick={() => {
              // setLoginRole("User");
              user ? logout () :
              setShowLogin(true);
            }}
            className="btn-login"
          >
            
            {user ? 'Logout' : 'Login'}
          </button>
          <button
            onClick={() => {
              isOwner ? navigate('/owner') : changeRole()
              
            }}
            className="btn-dashboard"
          >
            {isOwner ? 'Dashboard' : 'List Accommodation '}
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="menu-button"
        aria-label="Menu"
        onClick={() => setOpen(!open)}
      >
        <img
          src={open ? assets.close_icon : assets.menu_icon}
          alt="menu"
          className="menu-icon"
        />
      </button>
    </div>
  );
};

export default Navbar;
