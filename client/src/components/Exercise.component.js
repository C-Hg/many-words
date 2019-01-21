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
    this.toggleSpecialCharacters = this.toggleSpecialCharacters.bind(this);
    this.handleSpecialCharacter = this.handleSpecialCharacter.bind(this);
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
      specialCharactersVisible: false,
      failedWords: [],
      result: []
    };
  }

  toggleSpecialCharacters() {
    this.setState({
      specialCharactersVisible: true
    });
  }

  handleSpecialCharacter(event) {
    const letter = event.target.name;
    this.setState(state => ({
      userTranslation: state.userTranslation + letter
    }));
  }

  nextWord() {
    //goes to recap screen when all the words have been answered
    if (this.state.wordRank === this.state.exerciseWords.length - 1) {
      this.setState({
        status: "recap",
        checking: false,
        specialCharactersVisible: false
      });
    } else {
      this.setState(state => ({
        wordRank: state.wordRank + 1,
        userTranslation: "",
        checking: false,
        correctAnswer: false,
        expectedAnswer: "",
        specialCharactersVisible: false
      }));
    }
  }

  async restart() {
    let words = await exerciseFetcher(this.props.lesson);
    this.setState({
      status: "exercise",
      wordRank: 0,
      userTranslation: "",
      correctAnswer: false,
      expectedAnswer: "",
      activable: false,
      failedWords: [],
      result: [],
      exerciseWords: words
    });
  }

  redirect() {
    this.setState({
      redirect: true
    });
  }

  userTranslationChange(event) {
    this.setState({
      userTranslation: event.target.value
    });
  }

  submitUserTranslation() {
    let result = functions.checkUserTranslation(
      this.state.userTranslation,
      this.state.exerciseWords[this.state.wordRank]
    );
    this.setState(state => ({
      checking: true,
      correctAnswer: result[0],
      result: [
        ...state.result,
        [
          this.state.exerciseWords[this.state.wordRank].selectedForm[0],
          this.state.exerciseWords[this.state.wordRank].selectedForm[1],
          this.state.exerciseWords[this.state.wordRank].selectedForm[2],
          result[0]
        ]
      ]
    }));
    // if wrong answer, adds word to failedWords for restitution in recap
    if (!result[0]) {
      this.setState(state => ({
        //allows rendering of the expect answer in the footer
        expectedAnswer: result[1],
        //pushes origin word and expected answer for lesson recap at the end of the session
        failedWords: [
          ...state.failedWords,
          [
            this.state.exerciseWords[this.state.wordRank][
              this.state.exerciseWords[this.state.wordRank].selectedForm[1]
            ][0],
            result[1]
          ]
        ]
      }));
    }
  }

  async componentDidMount() {
    if (!this.state.exerciseWords) {
      let words = await exerciseFetcher(this.props.lesson);
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
            <Link
              to={`/${this.props.theme}/${this.props.subtheme}`}
              className="closeLink"
            >
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
              toggleSpecialCharacters={this.toggleSpecialCharacters}
              specialCharactersVisible={this.state.specialCharactersVisible}
              handleSpecialCharacter={this.handleSpecialCharacter}
            />
          )}
          {this.state.status === "recap" && (
            <ExerciseRecap
              result={this.state.result}
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
        //TO DO : implement waiting animation
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
