import React from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import AccommodationCards from "./AccommodationCards";
import { dummyAnnexData, assets } from "../assets/assets";
import "./FeaturedSection.css";

const FeaturedSection = () => {
  const navigate = useNavigate();

  return (
    <div className="featured-section-container">
      <div className="featured-section-title">
        <Title
          title="Our Accommodations"
          subTitle="Explore our selection of premium Accommodation available for your next adventure."
        />
      </div>

      <div className="featured-section-grid">
        {dummyAnnexData.slice(0, 6).map((annex) => (
          <div key={annex._id}>
            <AccommodationCards annex={annex} />
          </div>
        ))}
      </div>

      <button
        className="featured-section-button"
        onClick={() => {
          navigate("/Accommodations");
          scrollTo(0, 0);
        }}
      >
        Explore all accommodations
        <img src={assets.arrow_icon} alt="arrow" className="button-icon" />
      </button>
    </div>
  );
};

export default FeaturedSection;
