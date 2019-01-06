import React from "react";
import { LanguageContext } from "../../contexts/language-context";

class SubmitOrNextButton extends React.Component {
  render() {
    let language = this.context;
    let buttonClass = "";
    if (this.props.userTranslation === "") {
      buttonClass = "button-inactivable";
    } else {
      buttonClass = "button-activable";
    }
    if (this.props.checking && this.props.correctAnswer) {
      buttonClass = "button-correct";
    }

    return (
      <button
        className={"exercise-button " + buttonClass}
        onClick={
          this.props.checking
            ? this.props.nextWord
            : this.props.submitUserTranslation
        }
      >
        {this.props.checking ? language.next_button : language.check_button}
      </button>
    );
  }
}

SubmitOrNextButton.contextType = LanguageContext;

export default SubmitOrNextButton;
