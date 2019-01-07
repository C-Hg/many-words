import React, { Component } from "react";
import "./App.scss";
import Navbar from "./components/Navbar.component";
import Curriculum from "./components/Curriculum.component";
import Theme from "./components/Theme.component";
import Subtheme from "./components/Subtheme.component";
import Exercise from "./components/Exercise.component";
import Learning from "./components/Learning.component";

import exerciseFetcher from "./controllers/exercise_fetcher/exerciseFetcher.controller";
import getWordsToLearn from "./controllers/learning_fetcher/getWordsToLearn.controller";
import getSwitchesStates from "./controllers/learning_fetcher/getSwitchesStates.function";
import selectWordsToLearnForms from "./controllers/select_words_to_learn/selectWordsToLearnForms.controller";
import { getSubthemesNames } from "./controllers/getSubthemesNames.function";

//language Context
import { LanguageContext, languages } from "./contexts/language-context";
import { getLessons } from "./controllers/getLessons.function";

class App extends Component {
  constructor(props) {
    super(props);
    this.endSession = this.endSession.bind(this);
    this.startExercise = this.startExercise.bind(this);
    this.startLearning = this.startLearning.bind(this);
    this.seeTheme = this.seeTheme.bind(this);
    this.seeSubtheme = this.seeSubtheme.bind(this);
    this.state = {
      activity: "curriculum",
      containerClass: "main-container-as-menu",
      appClass: "app-with-navbar",
      theme: "",
      lesson: "",
      lessons: "",
      subtheme: "",
      subthemes: "",
      exerciseWords: "",
      formattedWords: "",
      main_language: languages.English,
      switches: ""
    };
  }

  async startExercise(event) {
    const lesson = event.target.name;
    let words = await exerciseFetcher(lesson);
    this.setState({
      activity: "exercise",
      lesson: lesson,
      exerciseWords: words,
      containerClass: "main-container-as-exercise",
      appClass: ""
    });
  }

  async startLearning(event) {
    const lesson = event.target.name;
    let wordsToLearn = await getWordsToLearn(lesson);
    let switches = getSwitchesStates(wordsToLearn);
    this.setState({
      activity: "learning",
      lesson: lesson,
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
      subthemes: getSubthemesNames(event.target.name)
    });
  }

  seeSubtheme(event) {
    this.setState({
      activity: "seeSubtheme",
      theme: "",
      subthemes: "",
      subtheme: event.target.name,
      lessons: getLessons(event.target.name)
    });
  }

  endSession() {
    this.setState({
      activity: "curriculum",
      exerciseWords: "",
      switches: "",
      formattedWords: "",
      containerClass: "main-container-as-menu",
      appClass: "app-with-navbar"
    });
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.main_language}>
        <div className={"app " + this.state.appClass}>
          <Navbar activity={this.state.activity} />
          <div className={"main-container " + this.state.containerClass}>
            {this.state.activity === "curriculum" && (
              <Curriculum seeTheme={this.seeTheme} />
            )}
            {this.state.activity === "theme" && (
              <Theme
                theme={this.state.theme}
                subthemes={this.state.subthemes}
                seeSubtheme={this.seeSubtheme}
              />
            )}
            {this.state.activity === "seeSubtheme" && (
              <Subtheme
                subtheme={this.state.subtheme}
                lessons={this.state.lessons}
                startExercise={this.startExercise}
                startLearning={this.startLearning}
              />
            )}
            {this.state.activity === "exercise" && (
              <Exercise
                endExercise={this.endSession}
                exerciseWords={this.state.exerciseWords}
                lesson={this.state.lesson}
              />
            )}
            {this.state.activity === "learning" && (
              <Learning
                lesson={this.state.lesson}
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
