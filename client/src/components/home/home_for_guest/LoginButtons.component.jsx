import React from "react";
import LoginWithGoogle from "./LoginWithGoogle.component";
import LoginWithFacebook from "./LoginWithFacebook.component";

export default function LoginButtons(props) {
  return (
    <div className="loginButtons">
      <LoginWithGoogle loginUser={props.loginUser} />
      <LoginWithFacebook loginUser={props.loginUser} />
    </div>
  );
}
