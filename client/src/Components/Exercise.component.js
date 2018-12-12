import React from "react";
import Instructions from "./Exercise_components/Instructions.component";
import OriginWord from "./Exercise_components/OriginWord.component";
import UserTranslation from "./Exercise_components/UserTranslation.component";
import SubmitOrNextButton from "./Exercise_components/SubmitOrNextButton.component";
import Result from "./Exercise_components/Result.component";
import functions from "../Functions/Exercise_functions/Exercise.functions";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.userTranslationChange = this.userTranslationChange.bind(this);
    this.submitUserTranslation = this.submitUserTranslation.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.state = {
      exerciseWords: [
        { french: "bonjour", english: "hello" },
        { french: "rouge", english: "red" },
        { french: "bleu", english: "blue" }
      ],
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
    if (this.state.wordRank === this.state.exerciseWords.length - 1) {
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
      this.state.exerciseWords[this.state.wordRank].french
    );
    this.setState({
      checking: true,
      correctAnswer: result
    });
  }

  render() {
    return (
      <div>
        <Instructions />
        <OriginWord
          originWord={this.state.exerciseWords[this.state.wordRank].english}
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
