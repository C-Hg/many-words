import React, { Component } from "react";
import "./App.css";
import Exercise from "./Components/Exercise.component";
import Curriculum from "./Components/Curriculum.component";

const testObject = [
  {
    name: "walk",
    fr: [
      {
        uniqueForm: "marcher"
      }
    ],
    en: [
      {
        uniqueForm: "to walk"
      }
    ],
    article: { hasArticle: false },
    lessonId: "#aLongId"
  },
  {
    name: "cat",
    //si le nom français de base accepte les 4 formes, il faut préciser les 4 pour le nom anglais
    //inversement au pluriel anglais, il faut accepter les 2 pluriels français si ils existent
    fr: [
      {
        acceptedForms: ["masc_sing", "masc_plur", "fem_sing", "fem_plur"],
        masc: { sing: "chat", plur: "chats" },
        fem: { sing: "chatte", plur: "chattes" }
      }
    ],
    en: [
      {
        masc: { sing: "cat", plur: "cats" },
        fem: { sing: "cat", plur: "cats" }
      }
    ],
    article: { hasArticle: true, isLApostrophe: false, isIndefiniteAn: false }
  }
];

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
