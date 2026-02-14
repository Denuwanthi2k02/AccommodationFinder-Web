import React, { useState } from "react";
import { assets} from "../assets/assets";
import "./Hero.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";  

const Hero = () => {
  
  const [distance, setDistance] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [numStudents, setNumStudents] = useState("");
  
  
  

  const navigate = useNavigate()
   const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.get(
        `/api/user/search?distance=${distance}&monthlyRent=${monthlyRent}&numStudents=${numStudents}`
      );

      if (data.success) {
        navigate("/search", { state: { results: data.results } });
      } else {
        alert(data.message || "No results found");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while searching");
    }
  };



  return (
    <section className="hero-section">
      {/* Left Content */}
      <div className="hero-text">
        <h1>
          Welcome To <br /> <span>AnnexMate Web</span>
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
          type="number"
            required
            placeholder="Distance (e.g. 5km)"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
          >
           
          </input>
        </div>

        {/* Monthly Rent */}
        <div className="search-field">
          <input
          type="number"
            required
            placeholder="Monthly Rent (e.g. 10000)"
            value={monthlyRent}
            onChange={(e) => setMonthlyRent(e.target.value)}
          >
            
          </input>
        </div>

        {/* No. of Students */}
        <div className="search-field">
          <input
          type="number"
            required
            placeholder="Capacity (e.g. 10)"
            value={numStudents}
            onChange={(e) => setNumStudents(e.target.value)}
          >
            
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
