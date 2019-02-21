import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Home from "../components/Home.component";
import About from "../components/About.component";

class MainLayoutWhite extends React.Component {
  render() {
    return (
      <div className="app app-with-navbar-full-screen">
        <Navbar />
        <div className="main-container whiteBackground">
          <Switch>
            <Route
              exact
              path={`/home`}
              render={props => (
                <Home
                  logoutUser={this.props.logoutUser}
                  logoutAndDeleteUser={this.props.logoutAndDeleteUser}
                  loginUser={this.props.loginUser}
                  {...props}
                />
              )}
            />
            <Route exact path={`/about`} component={About} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default MainLayoutWhite;
