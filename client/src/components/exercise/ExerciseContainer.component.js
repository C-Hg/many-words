import React from "react";

import Instructions from "./Instructions.component";
import OriginWord from "./OriginWord.component";
import UserTranslation from "./UserTranslation.component";
import SubmitOrNextButton from "./SubmitOrNextButton.component";
import SpecialCharacters from "./SpecialCharacters.component";
import { LanguageContext } from "../../contexts/language-context";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return { user: state.user, exercise: state.exercise };
}

class ExerciseContainer extends React.Component {
  render() {
    const sourceLanguage = this.props.exerciseWords[this.props.wordRank]
      .selectedForm[1];
    let languageClass = "";
    let language = this.context;
    if (language.language === "french") {
      languageClass = "exercise_container_french";
    } else {
      languageClass = "exercise_container_english";
    }
    return (
      <div className={"exercise_container " + languageClass}>
        <Instructions sourceLanguage={sourceLanguage} />
        <OriginWord />
        <UserTranslation />
        {language.language === "english" && (
          <SpecialCharacters
            sourceLanguage={sourceLanguage}
            specialCharactersVisible={this.props.specialCharactersVisible}
            toggleSpecialCharacters={this.props.toggleSpecialCharacters}
            handleSpecialCharacter={this.props.handleSpecialCharacter}
          />
        )}

        <SubmitOrNextButton />
      </div>
    );
  }
}

ExerciseContainer.contextType = LanguageContext;

export default connect(
  mapStateToProps,
  null
)(ExerciseContainer);
