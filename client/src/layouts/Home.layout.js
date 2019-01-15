import React from "react";
import { Route } from "react-router-dom";
import Navbar from "../components/Navbar.component";
import Home from "../components/Home.component";

function HomeLayout({ match }) {
  return (
    <div className="app app-with-navbar">
      <Navbar />
      <div className="main-container .main-container-full-screen">
        <Route exact path={match.path} render={props => <Home {...props} />} />
      </div>
    </div>
  );
}

export default HomeLayout;
