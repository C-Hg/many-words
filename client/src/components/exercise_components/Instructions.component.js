import React from "react";
import { LanguageContext } from "../../contexts/language-context";

const Instructions = function(props) {
  let sourceLanguageIsFr = true;
  if (props.sourceLanguage === "en") {
    sourceLanguageIsFr = false;
  }
  return (
    <LanguageContext.Consumer>
      {({ translate_in, french, english }) => (
        <div className="instructions">
          {translate_in} {sourceLanguageIsFr ? english : french}
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

export default Instructions;
