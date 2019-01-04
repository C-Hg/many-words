import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar.component";
import Curriculum from "./components/Curriculum.component";
import Theme from "./components/Theme.component";
import SeeLesson from "./components/SeeLesson.component";
import Exercise from "./components/Exercise.component";
import Learning from "./components/Learning.component";

import exerciseFetcher from "./controllers/exercise_fetcher/exerciseFetcher.controller";
import getWordsToLearn from "./controllers/learning_fetcher/getWordsToLearn.controller";
import getSwitchesStates from "./controllers/learning_fetcher/getSwitchesStates.function";
import selectWordsToLearnForms from "./controllers/select_words_to_learn/selectWordsToLearnForms.controller";
import { getLessonsNames } from "./controllers/getLessonsNames.function";

//language Context
import { LanguageContext, languages } from "./contexts/language-context";
import { getSubLessons } from "./controllers/getSubLessons.function";

class App extends Component {
  constructor(props) {
    super(props);
    this.endSession = this.endSession.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.startLearning = this.startLearning.bind(this);
    this.seeTheme = this.seeTheme.bind(this);
    this.seeLesson = this.seeLesson.bind(this);
    this.state = {
      activity: "curriculum",
      theme: "",
      lesson: "",
      lessons: "",
      subLessons: "",
      exerciseWords: "",
      formattedWords: "",
      main_language: languages.French,
      switches: ""
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
    let wordsToLearn = await getWordsToLearn(event.target.name);
    let switches = getSwitchesStates(wordsToLearn);
    this.setState({
      activity: "learning",
      exerciseWords: wordsToLearn,
      switches: switches,
      formattedWords: selectWordsToLearnForms(
        switches[0],
        switches[1],
        switches[2],
        wordsToLearn
      )
    });
  }

  seeTheme(event) {
    this.setState({
      activity: "theme",
      theme: event.target.name,
      lessons: getLessonsNames(event.target.name)
    });
  }

  seeLesson(event) {
    this.setState({
      activity: "seeLesson",
      theme: "",
      lesson: event.target.name,
      subLessons: getSubLessons(event.target.name)
    });
  }

  endSession() {
    this.setState({
      activity: "curriculum",
      exerciseWords: "",
      switches: "",
      formattedWords: ""
    });
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.main_language}>
        <div className="app">
          <Navbar />
          <div className="container">
            {this.state.activity === "curriculum" && (
              <Curriculum seeTheme={this.seeTheme} />
            )}
            {this.state.activity === "theme" && (
              <Theme
                theme={this.state.theme}
                lessons={this.state.lessons}
                seeLesson={this.seeLesson}
              />
            )}
            {this.state.activity === "seeLesson" && (
              <SeeLesson
                lesson={this.state.lesson}
                subLessons={this.state.subLessons}
                startExercise={this.startExercise}
                startLearning={this.startLearning}
              />
            )}
            {this.state.activity === "exercise" && (
              <Exercise
                endExercise={this.endSession}
                exerciseWords={this.state.exerciseWords}
              />
            )}
            {this.state.activity === "learning" && (
              <Learning
                switches={this.state.switches}
                endLearning={this.endSession}
                wordsToLearn={this.state.exerciseWords}
                formattedWords={this.state.formattedWords}
              />
            )}
          </div>
        </div>
      </LanguageContext.Provider>
    );
  }
}

export default App;
