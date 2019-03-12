import React from "react";
import "../../styles/Navbar.scss";
import { NavLink } from "react-router-dom";
import { LanguageContext } from "../../contexts/language-context";

import { connect } from "react-redux";

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {};
};

class Navbar extends React.Component {
  render() {
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
                <div>
                  {this.props.user.isAuthenticated ? navbar.home : navbar.login}
                </div>
              </NavLink>
            </div>
          </header>
        )}
      </LanguageContext.Consumer>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);
