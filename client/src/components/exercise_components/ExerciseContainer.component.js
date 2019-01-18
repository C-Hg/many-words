import React from "react";

import Instructions from "./Instructions.component";
import OriginWord from "./OriginWord.component";
import UserTranslation from "./UserTranslation.component";
import SubmitOrNextButton from "./SubmitOrNextButton.component";
import SpecialCharacters from "./SpecialCharacters.component";
import { LanguageContext } from "../../contexts/language-context";

class ExerciseContainer extends React.Component {
  render() {
    //sends the word depending on the selected source language
    const originWord = this.props.exerciseWords[this.props.wordRank][
      this.props.exerciseWords[this.props.wordRank].selectedForm[1]
    ][0];
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
        <OriginWord originWord={originWord} />
        <UserTranslation
          userTranslation={this.props.userTranslation}
          userTranslationChange={this.props.userTranslationChange}
          checking={this.props.checking}
          correctAnswer={this.props.correctAnswer}
          submitUserTranslation={this.props.submitUserTranslation}
          nextWord={this.props.nextWord}
        />
        {language.language === "english" && (
          <SpecialCharacters
            sourceLanguage={sourceLanguage}
            specialCharactersVisible={this.props.specialCharactersVisible}
            toggleSpecialCharacters={this.props.toggleSpecialCharacters}
            handleSpecialCharacter={this.props.handleSpecialCharacter}
          />
        )}

        <SubmitOrNextButton
          submitUserTranslation={this.props.submitUserTranslation}
          nextWord={this.props.nextWord}
          checking={this.props.checking}
          correctAnswer={this.props.correctAnswer}
          userTranslation={this.props.userTranslation}
        />
      </div>
    );
  }
}

ExerciseContainer.contextType = LanguageContext;

export default ExerciseContainer;
