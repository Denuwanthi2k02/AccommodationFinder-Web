import React, { useState } from "react";
import Title from "../components/Title";
import { assets, dummyAnnexData } from "../assets/assets";
import AccommodationCards from "../components/AccommodationCards";
import "./Accommodations.css";

const Accommodations = () => {
  const [input, setInput] = useState("");

  return (
    <div className="accommodations-container">
      {/* Header Section */}
      <div className="accommodations-header">
        <Title
          title="Available Accommodations"
          subTitle="Browse our selection of annexes and rooms available near campus"
        />
        {/* Search Section */}
        <div className="accommodations-search-box">
          <img src={assets.search_icon} alt="search" className="search-icon" />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder="Search by village, road, or features"
            className="accommodations-search-input"
          />
          <img src={assets.filter_icon} alt="filter" className="filter-icon" />
        </div>
      </div>
      {/* List Section */}
      <div className="accommodations-list">
        <p className="accommodations-count">
          Showing {dummyAnnexData.length} Accommodations
        </p>
        {/* Grid Section */}
        <div className="accommodations-grid">
          {dummyAnnexData.map((accommodation, index) => (
            <AccommodationCards key={index} annex={accommodation} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Accommodations;
