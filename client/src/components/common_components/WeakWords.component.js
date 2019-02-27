import React from "react";
import { LanguageContext } from "../../contexts/language-context";

function WeakWords(props) {
  return (
    <LanguageContext.Consumer>
      {({ navigation }) => (
        <button
          onClick={props.startWeakWords}
          className="weak_words_button"
          context={props.context}
          reference={props.reference}
        >
          {navigation.weak_words}
        </button>
      )}
    </LanguageContext.Consumer>
  );
}

export default WeakWords;
