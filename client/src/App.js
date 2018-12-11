import React, { Component } from "react";
import "./App.css";
import Exercise from "./Components/Exercise";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "Exercise",
      exerciseWords: [
        { french: "bonjour", english: "hello" },
        { french: "rouge", english: "red" },
        { french: "bleu", english: "blue" }
      ],
      wordRank: 1,
      userTranslationInput: ""
    };
    this.handleUserTranslationChange = this.handleUserTranslationChange.bind(
      this
    );
  }

  handleUserTranslationChange(event) {
    this.setState({
      userTranslationInput: event.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <Exercise
          exerciseWords={this.state.exerciseWords}
          wordRank={this.state.wordRank}
          handleUserTranslationChange={this.handleUserTranslationChange}
          userTranslationInput={this.state.userTranslationInput}
        />
      </div>
    );
  }
}

export default App;
