import React from "react";
import { Redirect, Link } from "react-router-dom";
import exerciseFetcher from "../controllers/exercise_fetcher/exerciseFetcher.controller";
import Close from "./common_components/Close.component";
import ExerciseTitle from "./exercise_components/ExerciseTitle.component";
import functions from "../controllers/exercise_functions/checkUserTranslation.functions";
import ExerciseContainer from "./exercise_components/ExerciseContainer.component";
import ExerciseFooter from "./exercise_components/ExerciseFooter.component";
import ExerciseRecap from "./exercise_components/ExerciseRecap.component";

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.userTranslationChange = this.userTranslationChange.bind(this);
    this.submitUserTranslation = this.submitUserTranslation.bind(this);
    this.nextWord = this.nextWord.bind(this);
    this.restart = this.restart.bind(this);
    this.redirect = this.redirect.bind(this);
    this.state = {
      status: "exercise",
      exerciseWords: "",
      wordRank: 0,
      userTranslation: "",
      checking: false,
      correctAnswer: false,
      expectedAnswer: "",
      activable: false,
      redirect: false,
      failedWords: []
    };
  }

  userTranslationChange(event) {
    this.setState({
      userTranslation: event.target.value
    });
  }

  nextWord() {
    //goes to recap screen when all the words have been answered
    if (this.state.wordRank === this.state.exerciseWords.length - 1) {
      this.setState({
        status: "recap",
        checking: false
      });
    } else {
      this.setState(state => ({
        wordRank: state.wordRank + 1,
        userTranslation: "",
        checking: false,
        correctAnswer: false,
        expectedAnswer: ""
      }));
    }
  }

  restart() {
    this.setState({
      status: "exercise",
      wordRank: 0,
      userTranslation: "",
      correctAnswer: false,
      expectedAnswer: "",
      activable: false,
      failedWords: []
    });
  }

  redirect() {
    this.setState({
      redirect: true
    });
  }

  submitUserTranslation() {
    let result = functions.checkUserTranslation(
      this.state.userTranslation,
      this.state.exerciseWords[this.state.wordRank]
    );
    this.setState({
      checking: true,
      correctAnswer: result[0]
    });
    if (!result[0]) {
      this.setState(state => ({
        //allows rendering of the expect answer in the footer
        expectedAnswer: result[1],
        //pushes origin word and expected answer for lesson recap at the end of the session
        failedWords: [
          ...state.failedWords,
          [
            this.state.exerciseWords[this.state.wordRank][
              this.state.exerciseWords[this.state.wordRank].sourceLanguage
            ][0],
            result[1]
          ]
        ]
      }));
    }
  }

  async componentDidMount() {
    if (this.state.exerciseWords === "") {
      const lesson = this.props.lesson;
      let words = await exerciseFetcher(lesson);
      this.setState({
        exerciseWords: words
      });
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/${this.props.theme}/${this.props.subtheme}`} />;
    }
    if (this.state.exerciseWords) {
      return (
        <div className="exercise">
          <div className="titleAndCross">
            <Link to={`/${this.props.theme}/${this.props.subtheme}`}>
              <Close />{" "}
            </Link>
            <ExerciseTitle lesson={this.props.lesson} />
          </div>
          {this.state.status === "exercise" && (
            <ExerciseContainer
              exerciseWords={this.state.exerciseWords}
              wordRank={this.state.wordRank}
              userTranslation={this.state.userTranslation}
              checking={this.state.checking}
              correctAnswer={this.state.correctAnswer}
              userTranslationChange={this.userTranslationChange}
              submitUserTranslation={this.submitUserTranslation}
              nextWord={this.nextWord}
            />
          )}
          {this.state.status === "recap" && (
            <ExerciseRecap
              failedWords={this.state.failedWords}
              restart={this.restart}
              redirect={this.redirect}
              lesson={this.props.lesson}
              theme={this.props.theme}
              subtheme={this.props.subtheme}
            />
          )}
          <ExerciseFooter
            correctAnswer={this.state.correctAnswer}
            expectedAnswer={this.state.expectedAnswer}
            checking={this.state.checking}
            status={this.state.status}
            wordRank={this.state.wordRank}
            failedWords={this.state.failedWords}
          />
        </div>
      );
    } else {
      return (
        <div className="exercise">
          <ExerciseTitle lesson={this.props.lesson} />
          <ExerciseFooter
            correctAnswer={this.state.correctAnswer}
            expectedAnswer={this.state.expectedAnswer}
            checking={this.state.checking}
          />
        </div>
      );
    }
  }
}

export default Exercise;
