import React, { useState } from "react";
import { dummyOwnerData, assets, ownerMenuLinks } from "../../assets/assets";
import { useLocation, NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const user = dummyOwnerData;
  const location = useLocation();

  const [image, setImage] = useState("");

  const updateImage = async () => {
    user.image = URL.createObjectURL(image);
    setImage("");
  };

  return (
    <div className="sidebar">
      {/* Profile Image Upload */}
      <div className="sidebar-profile group relative">
        <label htmlFor="image">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=300"
            }
            alt="profile"
            className="sidebar-profile-img"
          />
          <input
            type="file"
            id="image"
            accept="image/*"
            hidden
            onChange={(e) => setImage(e.target.files[0])}
          />

          <div className="sidebar-profile-overlay">
            <img src={assets.edit_icon} alt="edit" />
          </div>
        </label>
      </div>

      {/* Save Button */}
      {image && (
        <button className="sidebar-save-btn" onClick={updateImage}>
          Save
          <img src={assets.check_icon} width={13} alt="check" />
        </button>
      )}

      {/* Username */}
      <p className="sidebar-username">{user?.name}</p>

      {/* Navigation Links */}
      <div className="sidebar-links">
        {ownerMenuLinks.map((link, index) => (
          <NavLink
            key={index}
            to={link.path}
            end
            className={({ isActive }) =>
              `sidebar-link ${isActive ? "active" : ""}`
            }
          >
            <img
              src={
                link.path === location.pathname ? link.coloredIcon : link.icon
              }
              alt="menu icon"
            />
            <span className="sidebar-link-name">{link.name}</span>
            {link.path === location.pathname && (
              <div className="sidebar-active-indicator"></div>
            )}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
