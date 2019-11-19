import React from "react";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../contexts/language-context";
import Navbar from "../navbar/Navbar.styled";
import NavbarLinksContainer from "../navbar/NavbarLinksContainer.styled";
import NavbarLink from "../navbar/NavbarLink.styled";
import ManyWords from "../navbar/ManyWords.styled";
import H2 from "../components/texts/H2.styled";

const mapStateToProps = state => ({ user: state.user });

const HomeNavbar = props => {
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
                <H2 fontWeight="400" fontSize="22px">
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

HomeNavbar.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(HomeNavbar);
