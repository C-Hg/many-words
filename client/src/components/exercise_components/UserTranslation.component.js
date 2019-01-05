import React from "react";

class UserTranslation extends React.Component {
  constructor(props) {
    super(props);
    this.translationInput = React.createRef();
  }

  componentDidMount() {
    this.translationInput.current.focus();
  }

  //autofocus on the input field for each new word
  componentDidUpdate() {
    if (this.props.checking === false) {
      this.translationInput.current.focus();
    }
  }

  render() {
    return (
      <input
        class="userInput"
        value={this.props.userTranslation}
        onChange={this.props.userTranslationChange}
        ref={this.translationInput}
      />
    );
  }
}

export default UserTranslation;
