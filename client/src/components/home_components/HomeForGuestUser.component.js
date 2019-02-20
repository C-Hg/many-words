import React from "react";
import Welcome from "./Welcome.component";
import LoginButtons from "./LoginButtons.component";
import Features from "./Features.component";
import Register from "./Register.component";
import Discover from "./Discover.component";

function HomeForGuestUser(props) {
  return (
    <div className="homeForGuestUser whiteBackground">
      <Welcome />
      <Features />
      <Register />
      <LoginButtons loginUser={props.loginUser} />
      <Discover />
    </div>
  );
}

export default HomeForGuestUser;
