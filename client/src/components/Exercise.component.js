import React from "react";
import Instructions from "./exercise_components/Instructions.component";
import OriginWord from "./exercise_components/OriginWord.component";
import UserTranslation from "./exercise_components/UserTranslation.component";
import SubmitOrNextButton from "./exercise_components/SubmitOrNextButton.component";
import Result from "./exercise_components/Result.component";
import functions from "../controllers/exercise_functions/checkUserTranslation.functions";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.userTranslationChange = this.userTranslationChange.bind(this);
    this.submitUserTranslation = this.submitUserTranslation.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.state = {
      wordRank: 0,
      userTranslation: "",
      checking: false,
      correctAnswer: false
    };
  }

  userTranslationChange(event) {
    this.setState({
      userTranslation: event.target.value
    });
  }

  nextWord() {
    //exits the exercise module when all the words have been answered
    if (this.state.wordRank === this.props.exerciseWords.length - 1) {
      this.props.endExercise();
    }
    this.setState(state => ({
      wordRank: state.wordRank + 1,
      userTranslation: "",
      checking: false,
      correctAnswer: false
    }));
  }

  submitUserTranslation() {
    let result = functions.checkUserTranslation(
      this.state.userTranslation,
      this.props.exerciseWords[this.state.wordRank]
    );
    this.setState({
      checking: true,
      correctAnswer: result
    });
  }

  render() {
    return (
      <div>
        <Instructions
          sourceLanguage={
            this.props.exerciseWords[this.state.wordRank].sourceLanguage
          }
        />
        <OriginWord
          originWord={
            //sends the word depending on the selected source language
            this.props.exerciseWords[this.state.wordRank][
              this.props.exerciseWords[this.state.wordRank].sourceLanguage
            ][0]
          }
        />
        <UserTranslation
          userTranslation={this.state.userTranslation}
          userTranslationChange={this.userTranslationChange}
        />
        <SubmitOrNextButton
          submitUserTranslation={this.submitUserTranslation}
          nextWord={this.nextWord}
          checking={this.state.checking}
        />
        {this.state.checking && (
          <Result correctAnswer={this.state.correctAnswer} />
        )}
      </div>
    );
  }
}

export default Exercise;
