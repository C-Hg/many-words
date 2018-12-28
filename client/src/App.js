import React, { Component } from "react";
import "./App.css";
import Exercise from "./components/Exercise.component";
import Curriculum from "./components/Curriculum.component";
import exerciseFetcher from "./controllers/exercise_fetcher/exerciseFetcher.controller";

class App extends Component {
  constructor(props) {
    super(props);
    this.endExercise = this.endExercise.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.state = {
      activity: "curriculum",
      lesson: "",
      exerciseWords: ""
    };
  }

  async startExercise(event) {
    let result = await exerciseFetcher(event.target.name);
    console.log(result);
    this.setState({
      activity: "exercise",
      exerciseWords: result
    });
  }

  endExercise() {
    this.setState({
      activity: "curriculum"
    });
  }

  render() {
    return (
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
    );
  }
}

export default App;
