import React from "react";

import LandingNavbarContainer from "./LandingNavbarContainer.styled";
import ManyWords from "./ManyWords.styled";
import Navbar from "./Navbar.styled";
import NavbarElement from "./NavbarElement.styled";

const LandingPageNavbar = () => {
  return (
    <Navbar>
      <LandingNavbarContainer>
        <NavbarElement>
          <ManyWords>Many Words</ManyWords>
        </NavbarElement>
      </LandingNavbarContainer>
    </Navbar>
  );
};

export default LandingPageNavbar;
