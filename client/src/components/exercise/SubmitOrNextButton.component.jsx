import React from "react";
import { connect } from "react-redux";
import { LanguageContext } from "../../contexts/language-context";
import { actions as exerciseActions } from "../../redux/reducers/exercise";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    nextWord: () => {
      dispatch(exerciseActions.nextWord());
    },
    submitUserTranslation: () => {
      dispatch(exerciseActions.submitUserTranslation());
    }
  };
};

class SubmitOrNextButton extends React.Component {
  render() {
    const language = this.context;
    let buttonClass = "";
    const { exercise } = this.props;
    if (exercise.userTranslation === "") {
      buttonClass = "button-inactivable";
    } else {
      buttonClass = "button-activable";
    }
    if (exercise.checking) {
      if (exercise.isAnswerCorrect) {
        buttonClass = "button-correct";
      } else {
        buttonClass = "button-wrong";
      }
    }

    return (
      <button
        className={`exercise-button ${buttonClass}`}
        onClick={
          exercise.checking
            ? this.props.nextWord
            : this.props.submitUserTranslation
        }
      >
        {exercise.checking ? language.next_button : language.check_button}
      </button>
    );
  }
}

SubmitOrNextButton.contextType = LanguageContext;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SubmitOrNextButton);
