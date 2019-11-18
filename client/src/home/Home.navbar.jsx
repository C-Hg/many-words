import React from "react";
import "../styles/Navbar.scss";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../contexts/language-context";
import Navbar from "../components/navbar/Navbar.styled";
import NavbarLinksContainer from "../components/navbar/NavbarLinksContainer.styled";
import NavbarLink from "../components/navbar/NavbarLink.styled";

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
                <div className="manyWords">Many Words</div>
              </Link>
            </NavbarLink>
            <NavbarLink to="/home">
              <div>{user.isAuthenticated ? navbar.home : navbar.login}</div>
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
