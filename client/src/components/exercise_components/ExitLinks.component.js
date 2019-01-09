import React from "react";
import { LanguageContext } from "../../contexts/language-context";

const WordsToRemember = function(props) {
  return (
    <LanguageContext.Consumer>
      {({ try_again, to_continue }) => (
        <div className="links">
          <button className="exitLink" onClick={props.restart}>
            {try_again}
          </button>
          <button className="exitLink" onClick={props.redirect}>
            {to_continue}
          </button>
        </div>
      )}
    </LanguageContext.Consumer>
  );
};

export default WordsToRemember;
