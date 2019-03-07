import React from "react";

class SpecialCharacters extends React.Component {
  render() {
    let visible = this.props.specialCharactersVisible;
    let visibilityClass = visible
      ? "specialCharacters-visible"
      : "specialCharacters-invisible";
    // the element is rendered only for english speakers when translating to French
    // space is reserved for better visual experience
    if (this.props.sourceLanguage === "fr") {
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
                onClick={this.props.handleSpecialCharacter}
                name="é"
              >
                é
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="è"
              >
                è
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="ê"
              >
                ê
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="ë"
              >
                ë
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="à"
              >
                à
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="â"
              >
                â
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="î"
              >
                î
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="ï"
              >
                ï
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="ô"
              >
                ô
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="û"
              >
                û
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
                name="ù"
              >
                ù
              </button>
              <button
                className="specialCharacter"
                onClick={this.props.handleSpecialCharacter}
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

export default SpecialCharacters;
