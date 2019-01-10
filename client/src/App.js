import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import "./style_common/material_icons.css";

//language Context
import { LanguageContext, languages } from "./contexts/language-context";
import MainLayout from "./layouts/Main.layout";
import ExerciseLayout from "./layouts/Exercise.layout";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      main_language: languages.French,
      language_selected: false
    };
  }

  //automatic language selection without login
  componentDidMount() {
    if (!this.state.language_selected) {
      if (!/fr/i.test(window.navigator.language)) {
        this.setState({
          main_language: languages.English,
          language_selected: true
        });
      }
    }
  }

  render() {
    return (
      <LanguageContext.Provider value={this.state.main_language}>
        <Switch>
          <Route
            exact
            path="/:themeId/:subthemeId/:lessonId/test"
            component={ExerciseLayout}
          />
          <Route path="/" component={MainLayout} />
        </Switch>
      </LanguageContext.Provider>
    );
  }
}

export default App;
