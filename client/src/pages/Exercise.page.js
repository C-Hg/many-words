import React from "react";
import { Redirect } from "react-router-dom";
import Close from "../components/exercise/Close.component";
import ExerciseTitle from "../components/exercise/ExerciseTitle.component";
import ExerciseContainer from "../components/exercise/ExerciseContainer.component";
import ExerciseFooter from "../components/exercise/ExerciseFooter.component";
import ExerciseRecap from "../components/exercise/ExerciseRecap.component";
import weakWordsFetcher from "../controllers/exercise_fetcher/weakWordsFetcher.controller";
import makeBatches from "../controllers/exercise_fetcher/makeBatches.function";
import { connect } from "react-redux";
import { actions as exerciseActions } from "../redux/reducers/exercise";

import "../styles/Exercise.scss";

function mapStateToProps(state) {
  return { user: state.user, exercise: state.exercise };
}

const mapDispatchToProps = dispatch => {
  return {
    getWords: lesson => {
      dispatch(exerciseActions.getWords(lesson));
    },
    getWeakWords: () => {
      dispatch(exerciseActions.getWeakWords());
    }
  };
};

/*     2 main cases : either we are in weak words mode or not!      */

class Exercise extends React.Component {
  constructor(props) {
    super(props);
    this.toggleSpecialCharacters = this.toggleSpecialCharacters.bind(this);
    this.handleSpecialCharacter = this.handleSpecialCharacter.bind(this);
    this.updateWords = this.updateWords.bind(this);
    this.redirect = this.redirect.bind(this);
    this.state = {
      weak_words_mode: false,
      weak_words: "",
      weak_words_batches_done: 0,
      status: "exercise",
      exerciseWords: this.props.exercise.words,
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

  /*   -----------------------            user input management        -------------------  */

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

  // quit exercise screen
  redirect() {
    let user = this.context;
    if (user.isAuthenticated && user.activity === "weak_words") {
      // user.resetActivity(); // exits weak_words mode
    }
    this.setState({
      redirect: true
    });
  }

  // starts another exercise
  // async restart() {
  //   this.setState({
  //     status: "exercise",
  //     wordRank: 0,
  //     userTranslation: "",
  //     correctAnswer: false,
  //     expectedAnswer: "",
  //     activable: false,
  //     failedWords: [],
  //     result: []
  //   });
  //   this.getNewWords();
  // }

  /*     ----------------------        fetching content        ------------------ */

  async getWeakWords() {
    let weak_words = this.state.weak_words;
    let currentBatch = this.state.weak_words_batches_done;
    let totalNumberOfBatches = weak_words.length;

    // if words are already fetched, sends the next batch if present
    if (weak_words && currentBatch < totalNumberOfBatches) {
      this.setState({
        exerciseWords: weak_words[currentBatch]
      });

      // else get new batches
    } else {
      let user = this.context;
      let context = user.weak_words_details.context;
      let reference = user.weak_words_details.reference;
      let new_weak_words;
      try {
        new_weak_words = await weakWordsFetcher(context, reference);
        new_weak_words = makeBatches(new_weak_words);
        this.setState({
          exerciseWords: new_weak_words[0],
          weak_words: new_weak_words,
          weak_words_batches_done: 0,
          weak_words_mode: true
        });
      } catch (e) {
        console.log("error while fetching weak words");
      }
    }
  }

  updateWords() {
    if (this.props.exercise.weak_words_mode) {
      this.props.getWeakWords();
    } else {
      this.props.getWords(this.props.match.params.lessonId);
    }
  }

  //getting words on first rendering
  componentDidMount() {
    if (!this.props.exercise.words) {
      this.updateWords();
    }
  }

  /* MIGHT BE ENOUGH ONCE STATE CLEARANCE IS DONE ON REDIRECTION   */

  //getting words when restarting lesson
  componentDidUpdate() {
    if (!this.props.exercise.words) {
      this.updateWords();
    }
  }

  render() {
    const words = this.props.exercise.words;
    if (this.state.redirect) {
      if (this.state.weak_words_mode) {
        // if weak words on, goes to main menu
        return <Redirect to={`/curriculum`} />;
      } else return <Redirect to={`/${this.props.match.params.themeId}`} />;
    }
    if (words) {
      return (
        <div className="app">
          <div className="main-container">
            <div className="exercise whiteBackground">
              <div className="titleAndCross">
                <Close redirect={this.redirect} />
                <ExerciseTitle
                  lesson={words[this.state.wordRank].lesson}
                  theme={words[this.state.wordRank].theme}
                  weak_words_mode={this.state.weak_words_mode}
                  status={this.props.exercise.status}
                />
              </div>
              {this.props.exercise.status === "exercise" && (
                <ExerciseContainer
                  exerciseWords={words}
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
              {this.props.exercise.status === "recap" && (
                <ExerciseRecap
                  failedWords={this.state.failedWords}
                  redirect={this.redirect}
                  lesson={this.props.match.params.lessonId}
                  theme={this.props.match.params.themeId}
                />
              )}
              <ExerciseFooter
                correctAnswer={this.state.correctAnswer}
                expectedAnswer={this.state.expectedAnswer}
                checking={this.props.exercise.checking}
                status={this.props.exercise.status}
                wordRank={this.state.wordRank}
                failedWords={this.state.failedWords}
              />
            </div>
          </div>
        </div>
      );
    } else {
      //TO DO : implement waiting animation
      return null;
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Exercise);
