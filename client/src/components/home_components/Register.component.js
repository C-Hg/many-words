import React from "react";
import { LanguageContext } from "../../contexts/language-context";

function Register() {
  return (
    <LanguageContext.Consumer>
      {({ home }) => <h2 className="register">{home.register}</h2>}
    </LanguageContext.Consumer>
  );
}

export default Register;
