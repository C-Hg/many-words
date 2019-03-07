import React from "react";
import { LanguageContext } from "../../contexts/language-context";

const DefIndefSwitch = function(props) {
  return (
    <LanguageContext.Consumer>
      {({ definite, indefinite }) => (
        <button className="switch" onClick={props.toggle}>
          {props.value === "definite" ? definite : indefinite}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

export default DefIndefSwitch;
