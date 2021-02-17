import React from "react";
import { useLocation } from "react-router-dom";

import MainNavbar from "./Main.navbar";
import LandingPageNavbar from "./landingPage/LandingPage.navbar";

const Navbar = () => {
  const location = useLocation();

  return location.pathname === "/welcome" ? (
    <LandingPageNavbar />
  ) : (
    <MainNavbar />
  );
};

export default Navbar;
