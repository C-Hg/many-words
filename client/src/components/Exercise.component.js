import React from "react";
import "./styles/Exercise.scss";
import ExerciseTitle from "./exercise_components/ExerciseTitle.component";
import functions from "../controllers/exercise_functions/checkUserTranslation.functions";
import ExerciseContainer from "./exercise_components/ExerciseContainer.component";
import ExerciseFooter from "./exercise_components/ExerciseFooter.component";

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
      correctAnswer: false,
      expectedAnswer: "",
      activable: false
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
      correctAnswer: false,
      expectedAnswer: ""
    }));
  }

  submitUserTranslation() {
    let result = functions.checkUserTranslation(
      this.state.userTranslation,
      this.props.exerciseWords[this.state.wordRank]
    );
    this.setState({
      checking: true,
      correctAnswer: result[0]
    });
    if (!result[0]) {
      this.setState({
        expectedAnswer: result[1]
      });
    }
  }

  render() {
    return (
      <div className="exercise">
        <ExerciseTitle lesson={this.props.lesson} />
        <ExerciseContainer
          exerciseWords={this.props.exerciseWords}
          wordRank={this.state.wordRank}
          userTranslation={this.state.userTranslation}
          checking={this.state.checking}
          correctAnswer={this.state.correctAnswer}
          userTranslationChange={this.userTranslationChange}
          submitUserTranslation={this.submitUserTranslation}
          nextWord={this.nextWord}
        />
        <ExerciseFooter
          correctAnswer={this.state.correctAnswer}
          expectedAnswer={this.state.expectedAnswer}
          checking={this.state.checking}
        />
      </div>
    );
  }
}

export default Exercise;
