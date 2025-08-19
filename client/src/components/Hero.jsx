import React, { useState } from "react";
import { assets, cityList } from "../assets/assets";
import "./Hero.css";

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [distance, setDistance] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [numStudents, setNumStudents] = useState("");

  const distanceOptions = ["< 1 km", "1-3 km", "3-5 km", "5+ km"];
  const rentOptions = ["< 5000", "5000-10000", "10000-15000", "15000+"];
  const studentOptions = ["1", "2", "3", "4+"];

  return (
    <section className="hero-section">
      {/* Left Content */}
      <div className="hero-text">
        <h1>
          Welcome To <br /> <span>AnnexMate</span>
        </h1>
        <p>
          Find your perfect stay – quick and easy! AnnexMate is designed for
          students of the{" "}
          <strong>Faculty of Engineering, University of Ruhuna</strong> to find
          comfortable and convenient annexes and rental rooms near university.
        </p>
        <p>
          This platform allows owners to easily list their available
          accommodations, and students to browse, compare, and choose what suits
          them best — all in one place.
          <br />
          Simple, secure, and stress-free — built with your university life in
          mind.
        </p>
      </div>

      {/* Right Image */}
      <div className="hero-image-container">
        <img src={assets.Bachground_image_1} alt="Building" />
      </div>

      {/* Search Form */}
      <form className="search-form">
        {/* Distance */}
        <div className="search-field">
          <select
            required
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            <option value="">Distance</option>
            {distanceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* Monthly Rent */}
        <div className="search-field">
          <select
            required
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
          >
            <option value="">Monthly Rent</option>
            {rentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        {/* No. of Students */}
        <div className="search-field">
          <select
            required
            value={numStudents}
            onChange={(e) => setNumStudents(e.target.value)}
          >
            <option value="">No. of Students</option>
            {studentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </form>
    </section>
  );
};

export default Hero;
