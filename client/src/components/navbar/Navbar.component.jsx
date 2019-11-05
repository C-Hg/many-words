import React from "react";
import "../../styles/Navbar.scss";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { LanguageContext } from "../../contexts/language-context";

const mapStateToProps = state => ({ user: state.user });

const Navbar = props => {
  const { user } = props;
  return (
    <LanguageContext.Consumer>
      {({ navbar }) => (
        <header className="navbar">
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
        </header>
      )}
    </LanguageContext.Consumer>
  );
};

Navbar.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

export default connect(
  mapStateToProps,
  null
)(Navbar);
