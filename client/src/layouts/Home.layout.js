import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Home from "../components/Home.component";

class HomeLayout extends React.Component {
  render() {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container main-container-full-screen">
          <Route
            exact
            path={this.props.match.path}
            render={props => (
              <Home
                {...props}
                logoutUser={this.props.logoutUser}
                loginUser={this.props.loginUser}
              />
            )}
          />
        </div>
      </div>
    );
  }
}

export default HomeLayout;
