import React from "react";

import NavbarLinks from "./NavbarLinks";
import Navbar from "./common/Navbar.styled";
import NavbarElement from "./common/NavbarElement.styled";
import Logo from "./logo/Logo.styled";
import LogoContainer from "./logo/LogoContainer.styled";

import { breakpointsNumber } from "../app/breakpoints";
import useWindowDimensions from "../utils/useWindowDimensions";

const MainNavbar = () => {
  const { width } = useWindowDimensions();
  const largeView = width > breakpointsNumber.horizontalMid;

  return (
    <Navbar>
      {largeView && (
        <LogoContainer>
          <Logo>Many Words</Logo>
        </LogoContainer>
      )}
      <NavbarLinks />
      {largeView && <NavbarElement />}
    </Navbar>
  );
};

export default MainNavbar;
