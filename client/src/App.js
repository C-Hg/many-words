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
      main_language: languages.French
    };
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
