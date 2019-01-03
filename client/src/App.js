import React, { Component } from "react";
import "./App.css";
import Exercise from "./components/Exercise.component";
import Learning from "./components/Learning.component";
import Curriculum from "./components/Curriculum.component";
import exerciseFetcher from "./controllers/exercise_fetcher/exerciseFetcher.controller";
import getWordsToLearn from "./controllers/learning_fetcher/getWordsToLearn.controller";

//language Context
import { LanguageContext, languages } from "./contexts/language-context";

class App extends Component {
  constructor(props) {
    super(props);
    this.endExercise = this.endExercise.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.startLearning = this.startLearning.bind(this);
    this.state = {
      activity: "curriculum",
      lesson: "",
      exerciseWords: "",
      main_language: languages.French
    };
  }

  async startExercise(event) {
    let words = await exerciseFetcher(event.target.name);
    this.setState({
      activity: "exercise",
      exerciseWords: words
    });
  }

  async startLearning(event) {
    let words = await getWordsToLearn(event.target.name);
    this.setState({
      activity: "learning",
      exerciseWords: words
    });
  }

  endExercise() {
    this.setState({
      activity: "curriculum",
      exerciseWords: ""
    });
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.main_language}>
        <div className="App">
          {this.state.activity === "exercise" && (
            <Exercise
              endExercise={this.endExercise}
              exerciseWords={this.state.exerciseWords}
            />
          )}
          {this.state.activity === "learning" && (
            <Learning
              endLearning={this.endExercise}
              wordsToLearn={this.state.exerciseWords}
            />
          )}
          {this.state.activity === "curriculum" && (
            <Curriculum
              startExercise={this.startExercise}
              startLearning={this.startLearning}
            />
          )}
        </div>
      </LanguageContext.Provider>
    );
  }
}

export default App;
