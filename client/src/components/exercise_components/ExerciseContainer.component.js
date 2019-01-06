import React from "react";

import Instructions from "./Instructions.component";
import OriginWord from "./OriginWord.component";
import UserTranslation from "./UserTranslation.component";
import SubmitOrNextButton from "./SubmitOrNextButton.component";
import CorrectIcon from "./CorrectIcon.component";

class ExerciseContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="exercise_container">
        <Instructions
          sourceLanguage={
            this.props.exerciseWords[this.props.wordRank].sourceLanguage
          }
        />
        <OriginWord
          originWord={
            //sends the word depending on the selected source language
            this.props.exerciseWords[this.props.wordRank][
              this.props.exerciseWords[this.props.wordRank].sourceLanguage
            ][0]
          }
        />
        <UserTranslation
          userTranslation={this.props.userTranslation}
          userTranslationChange={this.props.userTranslationChange}
          checking={this.props.checking}
          correctAnswer={this.props.correctAnswer}
          submitUserTranslation={this.props.submitUserTranslation}
          nextWord={this.props.nextWord}
        />
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

export default ExerciseContainer;
