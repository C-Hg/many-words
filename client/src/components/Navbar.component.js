import React from "react";
import "./styles/Navbar.scss";

const Navbar = function(props) {
  return (
    <header className="navbar">
      <ul>
        <li className="title">Many Words</li>
        <li className="flags">Flags</li>
        <li className="home">Home</li>
      </ul>
    </header>
  );
};

export default Navbar;
