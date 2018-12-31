import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class SubmitOrNextButton extends React.Component {
  render() {
    let language = this.context;
    return (
      <div>
        <button
          onClick={
            this.props.checking
              ? this.props.nextWord
              : this.props.submitUserTranslation
          }
        >
          {this.props.checking ? language.next_button : language.check_button}
        </button>
      </div>
    );
  }
}

SubmitOrNextButton.contextType = LanguageContext;

export default SubmitOrNextButton;
