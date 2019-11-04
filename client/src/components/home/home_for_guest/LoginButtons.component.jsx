import React from "react";
import PropTypes from "prop-types";

import LoginWithGoogle from "./LoginWithGoogle.component";

const LoginButtons = props => {
  const { loginUser } = props;
  return (
    <div className="loginButtons">
      <LoginWithGoogle loginUser={loginUser} />
    </div>
  );
};

LoginButtons.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default LoginButtons;
