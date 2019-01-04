import React from "react";
import arrow from "../icons/back_arrow.svg";
import "./styles/BackArrow.css";

const BackArrow = function() {
  return <img src={arrow} alt="Back" className="icon" />;
};

export default BackArrow;
