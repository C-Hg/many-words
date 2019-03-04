import React from "react";
import { Redirect } from "react-router-dom";
import exerciseFetcher from "../controllers/exercise_fetcher/exerciseFetcher.controller";
import Close from "./exercise_components/Close.component";
import ExerciseTitle from "./exercise_components/ExerciseTitle.component";
import checkUserTranslation from "../controllers/exercise_functions/checkUserTranslation.function";
import ExerciseContainer from "./exercise_components/ExerciseContainer.component";
import ExerciseFooter from "./exercise_components/ExerciseFooter.component";
import ExerciseRecap from "./exercise_components/ExerciseRecap.component";
import { UserContext, user } from "../contexts/user-context";
import weakWordsFetcher from "../controllers/exercise_fetcher/weakWordsFetcher.controller";
import makeBatches from "../controllers/exercise_fetcher/makeBatches.function";
import updateWordStats from "../controllers/progress_tracking/updateWordStats.function";

import "./styles/Exercise.scss";
/*     2 main cases : either we are in weak words mode or not!      */

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
    this.getWords = this.getWords.bind(this);
    this.getWeakWords = this.getWeakWords.bind(this);
    this.state = {
      weak_words_mode: false,
      weak_words: "",
      weak_words_batches_done: 0,
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

  userTranslationChange(event) {
    // special characters are not allowed for security reasons
    const specialCharacters = /[.?/\\_+,;:!*()[\]{}~&%$]+/i;
    let isCharacterAllowed = !specialCharacters.test(event.target.value);
    if (isCharacterAllowed)
      this.setState({
        userTranslation: event.target.value
      });
  }

  submitUserTranslation() {
    let result = checkUserTranslation(
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

  /*     ------------------------         transitions          ------------------ */

  nextWord() {
    let currentUser = this.context;
    //goes to recap screen when all the words have been answered, and update stats in db
    if (this.state.wordRank === this.state.exerciseWords.length - 1) {
      if (currentUser.isAuthenticated) {
        updateWordStats(this.state.result);
        user.outdateUserStats();
      }
      this.setState({
        status: "recap",
        checking: false,
        specialCharactersVisible: false
      });
      if (this.state.weak_words_mode) {
        this.setState(state => ({
          weak_words_batches_done: state.weak_words_batches_done + 1
        }));
      }
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

  // quit exercise screen
  redirect() {
    let currentUser = this.context;
    if (currentUser.isAuthenticated && currentUser.activity === "weak_words") {
      user.resetActivity(); // exits weak_words mode
    }
    this.setState({
      redirect: true
    });
  }

  // starts another exercise
  async restart() {
    if (this.state.weak_words_mode) {
      this.getWeakWords();
    } else {
      let words = await exerciseFetcher(this.props.lesson);
      this.setState({
        exerciseWords: words
      });
    }
    this.setState({
      status: "exercise",
      wordRank: 0,
      userTranslation: "",
      correctAnswer: false,
      expectedAnswer: "",
      activable: false,
      failedWords: [],
      result: []
    });
  }

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
      let currentUser = this.context;
      let context = currentUser.weak_words_details.context;
      let reference = currentUser.weak_words_details.reference;
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

  async getWords() {
    try {
      let words = await exerciseFetcher(this.props.match.params.lessonId);
      this.setState({
        exerciseWords: words
      });
    } catch (e) {
      console.log("error while fetching words");
    }
  }

  componentDidMount() {
    let currentUser = this.context;
    if (!this.state.exerciseWords) {
      if (currentUser.activity === "weak_words") {
        this.getWeakWords();
      } else {
        this.getWords();
      }
    }
  }

  render() {
    if (this.state.redirect) {
      if (this.state.weak_words_mode) {
        // if weak words on, goes to main menu
        return <Redirect to={`/curriculum`} />;
      } else return <Redirect to={`/${this.props.match.params.themeId}`} />;
    }
    if (this.state.exerciseWords) {
      return (
        <div className="app">
          <div className="main-container">
            <div className="exercise whiteBackground">
              <div className="titleAndCross">
                <Close redirect={this.redirect} />
                <ExerciseTitle
                  lesson={this.state.exerciseWords[this.state.wordRank].lesson}
                  theme={this.state.exerciseWords[this.state.wordRank].theme}
                  weak_words_mode={this.state.weak_words_mode}
                  status={this.state.status}
                />
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
                  failedWords={this.state.failedWords}
                  restart={this.restart}
                  redirect={this.redirect}
                  lesson={this.props.match.params.lessonId}
                  theme={this.props.match.params.themeId}
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
          </div>
        </div>
      );
    } else {
      //TO DO : implement waiting animation
      return null;
    }
  }
}

export default Exercise;

Exercise.contextType = UserContext;
