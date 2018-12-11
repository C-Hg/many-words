import React, { Component } from "react";
import "./App.css";
import Exercise from "./Components/Exercise.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "Exercise"
    };
  }

  render() {
    return (
      <div className="App">
        <Exercise activity={this.state.activity} />
      </div>
    );
  }
}

export default App;
