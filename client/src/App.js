import React, { Component } from "react";
import "./App.css";
import Exercise from "./components/Exercise.component";
import Curriculum from "./components/Curriculum.component";
import exerciseFetcher from "./controllers/exercise_fetcher/exerciseFetcher.controller";

//language Context
import { LanguageContext, languages } from "./contexts/language-context";

class App extends Component {
  constructor(props) {
    super(props);
    this.endExercise = this.endExercise.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.state = {
      activity: "curriculum",
      lesson: "",
      exerciseWords: "",
      main_language: languages.French
    };
  }

  async startExercise(event) {
    let result = await exerciseFetcher(event.target.name);
    this.setState({
      activity: "exercise",
      exerciseWords: result
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

          {this.state.activity === "curriculum" && (
            <Curriculum startExercise={this.startExercise} />
          )}
        </div>
      </LanguageContext.Provider>
    );
  }
}

export default App;
