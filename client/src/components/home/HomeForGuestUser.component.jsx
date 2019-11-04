import React from "react";
import Welcome from "./home_for_guest/Welcome.component";
import LoginButtons from "./home_for_guest/LoginButtons.component";
import Features from "./home_for_guest/Features.component";
import Register from "./home_for_guest/Register.component";
import Discover from "./home_for_guest/Discover.component";

const HomeForGuestUser = () => (
  <div className="homeForGuestUser whiteBackground">
    <Welcome />
    <Features />
    <Register />
    <LoginButtons />
    <hr className="homeSeparator" />
    <Discover />
  </div>
);

export default HomeForGuestUser;
