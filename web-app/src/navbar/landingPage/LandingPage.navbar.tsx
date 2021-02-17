import React from "react";

import Navbar from "../common/Navbar.styled";
import NavbarElement from "../common/NavbarElement.styled";
import Logo from "../logo/Logo.styled";

const LandingPageNavbar = () => {
  return (
    <Navbar>
      <NavbarElement>
        <Logo>Many Words</Logo>
      </NavbarElement>
    </Navbar>
  );
};

export default LandingPageNavbar;
