import React from "react";
import { connect } from "react-redux";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    submitUserTranslation: () => {
      dispatch(exerciseActions.submitUserTranslation());
    },
    updateUserTranslation: value => {
      dispatch(exerciseActions.updateUserTranslation(value));
    },
    nextWord: () => {
      dispatch(exerciseActions.nextWord());
    }
  };
};

class UserTranslation extends React.Component {
  constructor(props) {
    super(props);
    this.translationInput = React.createRef();
    this.userTranslationChange = this.userTranslationChange.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  userTranslationChange(event) {
    // special characters are not allowed for security reasons
    const specialCharacters = /[.?/\\_+,;:!*()[\]{}~&%$]+/i;
    let isCharacterAllowed = !specialCharacters.test(event.target.value);
    if (isCharacterAllowed)
      this.props.updateUserTranslation(event.target.value);
  }

  handleEnter(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      if (this.props.exercise.checking) {
        this.props.nextWord();
      } else {
        this.props.submitUserTranslation();
      }
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleEnter);
    this.translationInput.current.focus();
  }

  //autofocus on the input field for each new word
  componentDidUpdate() {
    if (this.props.exercise.checking === false) {
      this.translationInput.current.focus();
    } else {
      this.translationInput.current.blur();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleEnter);
  }

  render() {
    let inputStatus = "";
    let readOnly = "";
    if (this.props.exercise.checking) {
      readOnly = "readonly";
      if (this.props.exercise.correctAnswer) {
        inputStatus = "input-correct";
      } else {
        inputStatus = "input-wrong";
      }
    } else {
      inputStatus = "input-active";
    }
    return (
      <input
        type="text"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        className={"userInput " + inputStatus}
        value={this.props.exercise.userTranslation}
        onChange={this.userTranslationChange}
        ref={this.translationInput}
        readOnly={readOnly}
      />
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTranslation);
