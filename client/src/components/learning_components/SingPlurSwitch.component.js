import React from "react";
import { LanguageContext } from "../../contexts/language-context";

const SingPlurSwitch = function(props) {
  return (
    <LanguageContext.Consumer>
      {({ singular, plural }) => (
        <button className="switch" onClick={props.toggle}>
          {props.value === "singular" ? singular : plural}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

export default SingPlurSwitch;
