import React from "react";
import { assets } from "../assets/assets";
import "./Banner.css";

const Banner = () => {
  return (
    <div className="banner-container">
      <div className="banner-text">
        <h2>Do You Own an Accommodation?</h2>
        <p className="banner-subtitle">
          Monetize your accommodation effortlessly by listing it on AnnexMate.
        </p>
        <p className="banner-description">
          Easily update your accommodation’s facilities, availability, and
          location so students can find you faster.
        </p>
        <button className="banner-btn">List your accommodation</button>
      </div>
      <div className="banner-image">
        <img src={assets.Bachground_image_1} alt="annex" />
      </div>
    </div>
  );
};

export default Banner;
