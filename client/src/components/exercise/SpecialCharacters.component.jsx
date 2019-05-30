import React from "react";
import { actions as exerciseActions } from "../../redux/reducers/exercise";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    toggleSpecialCharacters: () => {
      dispatch(exerciseActions.toggleSpecialCharacters());
    },
    updateUserTranslation: value => {
      dispatch(exerciseActions.updateUserTranslation(value));
    }
  };
};

class SpecialCharacters extends React.Component {
  constructor(props) {
    super(props);
    this.handleSpecialCharacter = this.handleSpecialCharacter.bind(this);
  }

  handleSpecialCharacter(event) {
    const letter = event.target.name;
    this.props.updateUserTranslation(
      this.props.exercise.userTranslation + letter
    );
  }

  render() {
    const exercise = this.props.exercise;
    const visible = this.props.exercise.specialCharactersVisible;
    const visibilityClass = visible
      ? "specialCharacters-visible"
      : "specialCharacters-invisible";
    // the element is rendered only for english speakers when translating to French
    // space is reserved for better visual experience
    if (exercise.words[exercise.wordRank].selectedForm[1] === "fr") {
      return <div className="specialCharacters noborder" />; //reserving space
    } else
      return (
        <div className={"specialCharacters " + visibilityClass}>
          {!visible && (
            <button
              className="toggleSpecialCharacters"
              onClick={this.props.toggleSpecialCharacters}
            >
              Special characters
            </button>
          )}
          {visible && (
            <div className="keys">
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="é"
              >
                é
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="è"
              >
                è
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="ê"
              >
                ê
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="ë"
              >
                ë
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="à"
              >
                à
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="â"
              >
                â
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="î"
              >
                î
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="ï"
              >
                ï
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="ô"
              >
                ô
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="û"
              >
                û
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="ù"
              >
                ù
              </button>
              <button
                className="specialCharacter"
                onClick={this.handleSpecialCharacter}
                name="ç"
              >
                ç
              </button>
            </div>
          )}
        </div>
      );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SpecialCharacters);
