import React from "react";
import "./AccommodationCards.css";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const AccommodationCards = ({ annex }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Increment views count
    annex.views = (annex.views || 0) + 1;

    navigate(`/accommodation-details/${annex._id}`);
    scrollTo(0, 0);
  };

  return (
    // <div className="annex-card" onClick={()=>{navigate(`/accommodation-details/${annex._id}`);scrollTo(0,0)}} >
    <div className="annex-card" onClick={handleClick}>
      <div className="annex-image-container">
        <img src={annex.image} alt="Car" className="annex-image" />
        {annex.isAvaliable && <p className="annex-available">Available Now</p>}
        <div className="annex-price">
          <span className="price"> {import.meta.env.VITE_CURRENCY} {annex.rentPerMonth}</span>
          <span className="per-day"> / month</span>
        </div>
      </div>

      <div className="annex-details-container">
        <div className="annex-details-header">
          <div>
            <h3 className="annex-title">
              {annex.No} {annex.Street}
            </h3>
            <p className="annex-subtitle">{annex.Village}</p>
          </div>
        </div>

        {/* Two-column Specs Section */}
        <div className="annex-specs-columns">
          {/* Column 1 */}
          <div className="spec-column">
            <div className="annex-spec-item">
              <img
                src={assets.users_icon}
                alt="Seats Icon"
                className="spec-icon"
              />
              <span>{annex.capacity} Beds</span>
            </div>
            <div className="annex-spec-item">
              <img
                src={assets.shower_line_icon}
                alt="Fuel"
                className="spec-icon"
              />
              <span>{annex.Bathroom} Bathroom</span>
            </div>
          </div>

          {/* Column 2 */}
          <div className="spec-column">
            <div className="annex-spec-item">
              <img
                src={assets.location_icon}
                alt="Location"
                className="spec-icon"
              />
              <span>{annex.location} km to campus</span>
            </div>

            <div className="annex-spec-item">
              <img
                src={assets.gender}
                alt="Transmission"
                className="spec-icon"
              />
              <span>{annex.Gender}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccommodationCards;
