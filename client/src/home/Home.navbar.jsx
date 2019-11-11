import React from "react";
import "../styles/Navbar.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../contexts/language-context";
import Navbar from "../components/navbar/Navbar.styled";

const mapStateToProps = state => ({ user: state.user });

const HomeNavbar = props => {
  const { user } = props;
  return (
    <LanguageContext.Consumer>
      {({ navbar }) => (
        <Navbar>
          <div className="navbar-links">
            <NavLink
              to="/curriculum"
              className="navbar-link inactive-link"
              activeClassName="active-link"
            >
              <div className="manyWords">Many Words</div>
            </NavLink>
            <NavLink
              to="/home"
              className="navbar-link inactive-link"
              activeClassName="active-link"
            >
              <div>{user.isAuthenticated ? navbar.home : navbar.login}</div>
            </NavLink>
          </div>
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
