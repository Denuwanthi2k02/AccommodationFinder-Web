import React, { useState, useEffect } from "react";
import { assets } from "../../assets/assets";
import "./UpdateUserProfile.css";
import Title from "../../components/Owner/Title";

const UpdateUserProfile = ({ existingUser, onClose }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    availableTime: "",
    address: "",
  });

  useEffect(() => {
    if (existingUser) {
      setUser({
        name: existingUser.name || "",
        email: existingUser.email || "",
        phone: existingUser.phone || "",
        password: "", // don’t prefill password for security
        availableTime: existingUser.availableTime
          ? existingUser.availableTime.join(", ")
          : "",
        address: existingUser.address || "",
      });
      setProfileImage(existingUser.image || null);
    }
  }, [existingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updated User Data:", { ...user, profileImage });
    onClose(); // Close after update (for now, frontend only)
  };

  return (
    <div className="updateuser-popup">
      <div className="updateuser-container">
        <Title title="Update Profile" subTitle="Edit your personal details" />
        <form onSubmit={handleSubmit} className="updateuser-form">
          {/* Profile Image */}
          <div className="updateuser-upload">
            <label htmlFor="profile-image" className="updateuser-upload-label">
              <img
                src={
                  profileImage
                    ? typeof profileImage === "string"
                      ? profileImage
                      : URL.createObjectURL(profileImage)
                    : assets.user_icon
                }
                alt="Profile"
                className="updateuser-upload-preview"
              />
              <input
                type="file"
                id="profile-image"
                accept="image/*"
                hidden
                onChange={(e) => setProfileImage(e.target.files[0])}
              />
            </label>
            <p className="updateuser-upload-text">Click to change profile photo</p>
          </div>

          {/* Name & Phone */}
          <div className="updateuser-grid-2">
            <div className="updateuser-form-group">
              <label>Full Name</label>
              <input
                type="text"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                required
              />
            </div>
            <div className="updateuser-form-group">
              <label>Phone</label>
              <input
                type="text"
                value={user.phone}
                onChange={(e) => setUser({ ...user, phone: e.target.value })}
                required
              />
            </div>
          </div>

          {/* Email & Password */}
          <div className="updateuser-grid-2">
            <div className="updateuser-form-group">
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                required
              />
            </div>
            <div className="updateuser-form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
              />
            </div>
          </div>

          {/* Available Time */}
          <div className="updateuser-form-group">
            <label>Available Time</label>
            <input
              type="text"
              placeholder="e.g. 9:00 AM - 11:00 AM, 2:00 PM - 5:00 PM"
              value={user.availableTime}
              onChange={(e) => setUser({ ...user, availableTime: e.target.value })}
            />
          </div>

          {/* Address */}
          <div className="updateuser-form-group">
            <label>Address</label>
            <textarea
              rows={3}
              value={user.address}
              onChange={(e) => setUser({ ...user, address: e.target.value })}
            />
          </div>

          {/* Actions */}
          <div className="updateuser-actions">
            <button type="button" onClick={onClose} className="updateuser-cancel">
              Cancel
            </button>
            <button type="submit" className="updateuser-submit">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserProfile;
