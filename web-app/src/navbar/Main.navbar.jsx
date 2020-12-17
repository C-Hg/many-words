import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "styled-components";

import ManyWords from "./ManyWords.styled";
import Navbar from "./Navbar.styled";
import NavbarLink from "./NavbarLink.styled";
import NavbarLinksContainer from "./LandingNavbarContainer.styled";

import H2 from "../components/texts/H2.styled";
import { LanguageContext } from "../contexts/language-context";

const MainNavbar = (props) => {
  const theme = useContext(ThemeContext);

  return (
    <LanguageContext.Consumer>
      {({ navbar }) => (
        <Navbar>
          <NavbarLinksContainer>
            <NavbarLink>
              <Link to="/curriculum">
                <ManyWords>Many Words</ManyWords>
              </Link>
            </NavbarLink>
            <NavbarLink>
              <Link to="/home">
                <H2 fontWeight="400" fontSize="22px" color={theme.colors.white}>
                  {navbar.home}
                </H2>
              </Link>
            </NavbarLink>
          </NavbarLinksContainer>
        </Navbar>
      )}
    </LanguageContext.Consumer>
  );
};

export default MainNavbar;
