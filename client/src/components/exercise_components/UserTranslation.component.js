import React from "react";

class UserTranslation extends React.Component {
  constructor(props) {
    super(props);
    this.translationInput = React.createRef();
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleKeyPress(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      this.handleEnter();
    }
  }

  handleEnter() {
    if (this.props.checking === false) {
      this.props.submitUserTranslation();
    } else {
      this.props.nextWord();
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
    this.translationInput.current.focus();
  }

  //autofocus on the input field for each new word
  componentDidUpdate() {
    if (this.props.checking === false) {
      this.translationInput.current.focus();
    } else {
      this.translationInput.current.blur();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress);
  }

  render() {
    let inputStatus = "";
    if (this.props.checking) {
      if (this.props.correctAnswer) {
        inputStatus = "input-correct";
      } else {
        inputStatus = "input-wrong";
      }
    }
    return (
      <input
        className={"userInput " + inputStatus}
        value={this.props.userTranslation}
        onChange={this.props.userTranslationChange}
        ref={this.translationInput}
      />
    );
  }
}

export default UserTranslation;
