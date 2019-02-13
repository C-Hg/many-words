import React from "react";
import "./styles/Navbar.scss";
import { NavLink } from "react-router-dom";

const Navbar = function(props) {
  return (
    <header className="navbar">
      <div className="navbar-links">
        <NavLink
          to="/curriculum"
          className="navbar-link inactive-link"
          activeClassName="active-link"
        >
          <div>Many Words</div>
        </NavLink>
        <NavLink
          to="/home"
          className="navbar-link inactive-link"
          activeClassName="active-link"
        >
          <div>Home</div>
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
