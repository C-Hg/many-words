import React from "react";
import LoginWithGoogle from "./LoginWithGoogle.component";

export default function LoginButtons(props) {
  return (
    <div className="loginButtons">
      <LoginWithGoogle loginUser={props.loginUser} />
    </div>
  );
}
