import React from "react";
import "./Title.css";

const Title = ({ title, subTitle }) => {
  return (
    <>
      <h1 className="owner-title-heading">{title}</h1>
      <p className="owner-title-subtitle">{subTitle}</p>
    </>
  );
};

export default Title;
