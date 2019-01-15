import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import "./style_common/material_icons.css";

//Contexts
import { LanguageContext, languages } from "./contexts/language-context";
import { UserContext, user } from "./contexts/user-context";

import MainLayout from "./layouts/Main.layout";
import FullScreenLayout from "./layouts/FullScreen.layout";
import HomeLayout from "./layouts/Home.layout";
import getUserDetails from "./controllers/auth/getUserDetails.function";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: user.guest,
      main_language: languages.French,
      language_selected: false,
      isSessionChecked: false
    };
  }

  //automatic language selection
  async componentDidMount() {
    if (!this.state.isSessionChecked) {
      let user = await getUserDetails();
      console.log(user);
      this.setState({
        isSessionChecked: true
      });
      if (typeof user === "object") {
        this.setState({
          user: user.loggedInUser
        });
      }
    }

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
      <UserContext.Provider value={this.state.user}>
        <LanguageContext.Provider value={this.state.main_language}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            <Route exact path="/home" component={HomeLayout} />
            <Route
              exact
              path="/:themeId/:subthemeId/:lessonId/test"
              component={FullScreenLayout}
            />
            <Route path="/" component={MainLayout} />
          </Switch>
        </LanguageContext.Provider>
      </UserContext.Provider>
    );
  }
}

export default App;
