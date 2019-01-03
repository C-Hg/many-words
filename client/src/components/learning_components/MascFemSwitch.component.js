import React from "react";
import { LanguageContext } from "../../contexts/language-context";

const MascFemSwitch = function(props) {
  return (
    <LanguageContext.Consumer>
      {({ masculine, feminine }) => (
        <button className="switch" onClick={props.toggle}>
          {props.value === "masculine" ? masculine : feminine}
        </button>
      )}
    </LanguageContext.Consumer>
  );
};

export default MascFemSwitch;
