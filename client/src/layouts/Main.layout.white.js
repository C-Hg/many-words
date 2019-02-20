import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Home from "../components/Home.component";

class MainLayoutWhite extends React.Component {
  render() {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container whiteBackground">
          <Route
            exact
            path={`${this.props.match.path}`}
            render={props => (
              <Home
                logoutUser={this.props.logoutUser}
                loginUser={this.props.loginUser}
                {...props}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default MainLayoutWhite;
