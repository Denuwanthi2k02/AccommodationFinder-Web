import React from "react";
import "./Title.css";

const Title = ({ title, subTitle, align }) => {
  return (
    <div
      className={`title-container ${
        align === "left" ? "title-left" : "title-center"
      }`}
    >
      <h1 className="title-main">{title}</h1>
      <p className="title-sub">{subTitle}</p>
    </div>
  );
};

export default Title;
