import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Home from "../components/Home.component";
import About from "../components/About.component";

class MainLayoutWhite extends React.Component {
  render() {
    console.log(this.props.match);
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container whiteBackground">
          <Route
            exact
            path={`/home`}
            render={props => (
              <Home
                logoutUser={this.props.logoutUser}
                loginUser={this.props.loginUser}
                {...props}
              />
            )}
          />
          <Route exact path={`/about`} component={About} />
        </div>
      </div>
    );
  }
}

export default MainLayoutWhite;
