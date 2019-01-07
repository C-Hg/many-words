import React from "react";
import "./styles/Navbar.scss";

const Navbar = function(props) {
  if (props.activity !== "exercise") {
    return (
      <header className="navbar">
        <ul>
          <li className="title">Many Words</li>
          <li className="flags">Flags</li>
          <li className="home">Home</li>
        </ul>
      </header>
    );
  } else return null;
};

export default Navbar;
