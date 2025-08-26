import React, { useState } from "react";
import { assets} from "../assets/assets";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
// import { useAppContext } from "../contex/AppContext";

const Hero = () => {
  
  const [distance, setDistance] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [numStudents, setNumStudents] = useState("");
  
  
  // const distanceOptions = ["< 1 km", "1-3 km", "3-5 km", "Above 5 km"];
  // const rentOptions = ["< 5000", "5000-10000", "10000-15000", "Above 15000"];
  // const studentOptions = ["1", "2", "3", "Above 4"];

  const navigate = useNavigate()
  const handleSearch =  (e) => {
    e.preventDefault();
    navigate(`/search?distance=${distance}&monthlyRent=${monthlyRent}&numStudents=${numStudents}`)
  };


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
      <form onSubmit={handleSearch} className="search-form">
        {/* Distance */}
        <div className="search-field">
          <input
            required
            placeholder="Distance (e.g. 5km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
            {/* <option value="">Distance</option>
            {distanceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))} */}
          </input>
        </div>

        {/* Monthly Rent */}
        <div className="search-field">
          <input
            required
            placeholder="Monthly Rent (e.g. 10000)"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
          >
            {/* <option value="">Monthly Rent</option>
            {rentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))} */}
          </input>
        </div>

        {/* No. of Students */}
        <div className="search-field">
          <input
            required
            placeholder="Capacity (e.g. 10)"
            value={numStudents}
            onChange={(e) => setNumStudents(e.target.value)}
          >
            {/* <option value="">No. of Students</option>
            {studentOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))} */}
          </input>
        </div>

        <button type="submit" className="search-btn">
          <i className="fa-solid fa-magnifying-glass"></i> Search
        </button>
      </form>
    </section>
  );
};

export default Hero;
