import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { ThemeContext } from "styled-components";

import { LanguageContext } from "../contexts/language-context";
import Navbar from "./Navbar.styled";
import NavbarLinksContainer from "./NavbarLinksContainer.styled";
import NavbarLink from "./NavbarLink.styled";
import ManyWords from "./ManyWords.styled";
import H2 from "../components/texts/H2.styled";

const mapStateToProps = state => ({ user: state.user });

const MainNavbar = props => {
  const theme = useContext(ThemeContext);
  const { user } = props;
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
                  {user.isAuthenticated ? navbar.home : navbar.login}
                </H2>
              </Link>
            </NavbarLink>
          </NavbarLinksContainer>
        </Navbar>
      )}
    </LanguageContext.Consumer>
  );
};

MainNavbar.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(MainNavbar);
