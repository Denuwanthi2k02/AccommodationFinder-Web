import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { dummyAnnexData, dummyOwnerData, assets } from "../assets/assets";
import "./AccommodationDetails.css";

const AccommodationDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const accommodation = dummyAnnexData.find((a) => a._id === id);
  const owner = dummyOwnerData.find((o) => o._id === accommodation.owner);

  return accommodation ? (
    <div className="accommodation-container">
      <div className="accommodation-main-grid">
        {/* Left Column */}
        <div className="left-column">
          <button onClick={() => navigate(-1)} className="back-btn">
            <img src={assets.arrow_icon} alt="" className="back-icon" />
            Back to all accommodations
          </button>

          {/* Image & Gallery */}
          <div className="accommodation-image-container">
            <img
              src={accommodation.image}
              alt="Main"
              className="accommodation-image"
            />

            <div className="image-gallery">
              {accommodation.gallery.map((img, index) => (
                <div key={index} className="gallery-item">
                  <img src={img} alt={`Gallery ${index}`} />
                </div>
              ))}
            </div>
          </div>

          {/* No, Street, Village below gallery */}
          <div className="accommodation-location-details">
            <h2 className="accommodation-title">
              {accommodation.No} {accommodation.Street}
            </h2>
            <p className="accommodation-subtitle">{accommodation.Village}</p>
          </div>

          <hr className="divider" />

          {/* Info Grid */}
          <div className="info-grid">
            {[
              {
                icon: assets.users_icon,
                text: `${accommodation.capacity} People`,
              },
              {
                icon: assets.shower_line_icon,
                text: `${accommodation.Bathroom} Bathroom(s)`,
              },
              { icon: assets.gender, text: accommodation.Gender },
              {
                icon: assets.location_icon,
                text: `${accommodation.location} km from campus`,
              },
            ].map(({ icon, text }) => (
              <div key={text} className="info-card">
                <img src={icon} alt="" className="info-icon" />
                {text}
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="section">
            <h1 className="section-title">Description</h1>
            <p className="section-text">{accommodation.description}</p>
          </div>

          {/* Features */}
          <div className="section">
            <h1 className="section-title">Features</h1>
            <ul className="features-list">
              {[
                "WiFi",
                "Air Conditioning",
                "Kitchen",
                "Parking",
                "Furnished",
              ].map((item) => (
                <li key={item} className="feature-item">
                  <img
                    src={assets.check_icon}
                    className="feature-icon"
                    alt=""
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column - Owner Details */}
        <div className="right-column">
          <h2 className="owner-title">Owner Details & Contact</h2>

          <div className="owner-card">
            <h3 className="owner-name">{owner.name}</h3>

            <p className="owner-contact">{owner.phone}</p>
            <p className="owner-email">{owner.email}</p>
          </div>

          <div className="available-times">
            <h4>Available Times :</h4>
            <ul>
              {Array.isArray(owner.availableTime) ? (
                owner.availableTime.map((time, index) => (
                  <li key={index}>{time}</li>
                ))
              ) : (
                <li>{owner.availableTime}</li>
              )}
            </ul>
          </div>

          {/* Booking Section */}
          <div className="booking-box">
            <h4>Ready to book?</h4>
            <p>
              Contact <strong>{owner.name}</strong> today to secure your spot at{" "}
              <span className="highlight">AnnexMate Owner’s Green Nest!</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Loading...</p>
  );
};

export default AccommodationDetails;
