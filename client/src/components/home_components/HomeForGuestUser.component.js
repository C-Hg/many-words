import React from "react";
import Welcome from "./home_for_guest_components/Welcome.component";
import LoginButtons from "./home_for_guest_components/LoginButtons.component";
import Features from "./home_for_guest_components/Features.component";
import Register from "./home_for_guest_components/Register.component";
import Discover from "./home_for_guest_components/Discover.component";

function HomeForGuestUser(props) {
  return (
    <div className="homeForGuestUser whiteBackground">
      <Welcome />
      <Features />
      <Register />
      <LoginButtons loginUser={props.loginUser} />
      <hr className="homeSeparator" />
      <Discover />
    </div>
  );
}

export default HomeForGuestUser;
