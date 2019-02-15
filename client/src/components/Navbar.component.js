import React from "react";
import "./styles/Navbar.scss";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../contexts/language-context";
import { UserContext } from "../contexts/user-context";

class Navbar extends React.Component {
  render() {
    let user = this.context;
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
                <div>Many Words</div>
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
  }
}

export default Navbar;

Navbar.contextType = UserContext;
