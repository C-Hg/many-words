import React, { Component } from "react";
import "./App.css";
import Exercise from "./Components/Exercise.component";
import Curriculum from "./Components/Curriculum.component";

const testObject = [
  {
    en_name: "walk",
    fr_name: "marcher",
    hasArticle: false,
    isUniqueForm: true,
    type: "verb",
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

    lessonId: "#aLongId"
  },
  {
    en_name: "cat",
    fr_name: "chat",
    hasArticle: true,
    isUniqueForm: false,
    //si le nom de base accepte un article, toutes les traductions doivent l'accepter
    //si le nom français de base accepte les 4 formes, il faut préciser les 4 pour le nom anglais
    //inversement au pluriel anglais, il faut accepter les 2 pluriels français si ils existent
    fr: [
      {
        acceptedForms: ["masc_sing", "masc_plur", "fem_sing", "fem_plur"],
        masc: { sing: "chat", plur: "chats" },
        fem: { sing: "chatte", plur: "chattes" },
        is_Definite_Article_L_Apostrophe: false
      }
    ],
    en: [
      {
        acceptedForms: ["sing", "plur"],
        sing: "cat",
        plur: "cats",
        is_Indefinite_Article_An: false
      }
    ]
  },
  {
    en_name: "travel",
    fr_name: "voyage",
    hasArticle: true,
    isUniqueForm: false,
    type: "noun",
    fr: [
      {
        acceptedForms: ["masc_sing", "masc_plur"],
        masc_sing: "voyage",
        masc_plur: "voyages",
        is_Definite_Article_L_Apostrophe: false
      }
    ],
    en: [
      {
        acceptedForms: ["sing", "plur"],
        sing: "travel",
        plur: "travels",
        is_Indefinite_Article_An: false
      },
      {
        acceptedForms: ["sing", "plur"],
        sing: "journey",
        plur: "journeys",
        is_Indefinite_Article_An: false
      }
    ]
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
