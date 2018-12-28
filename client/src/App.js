import React, { Component } from "react";
import "./App.css";
import Exercise from "./Components/Exercise.component";
import Curriculum from "./Components/Curriculum.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.endExercise = this.endExercise.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.state = {
      activity: "Curriculum"
    };
  }

  startExercise() {
    this.setState({
      activity: "Exercise"
    });
  }

  endExercise() {
    this.setState({
      activity: "Curriculum"
    });
  }

  render() {
    return (
      <div className="App">
        {this.state.activity === "Exercise" && (
          <Exercise endExercise={this.endExercise} />
        )}
        {this.state.activity === "Curriculum" && (
          <Curriculum startExercise={this.startExercise} />
        )}
      </div>
    );
  }
}

export default App;
