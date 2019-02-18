import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import "./style_common/material_icons.css";
import "./style_common/titles.scss";
import "./style_common/layouts.scss";
import "./style_common/buttons.scss";

// Contexts
import { LanguageContext, languages } from "./contexts/language-context";
import { UserContext, user } from "./contexts/user-context";

// Layouts
import MainLayout from "./layouts/Main.layout";
import FullScreenLayout from "./layouts/FullScreen.layout";

//functions
import getUserDetails from "./controllers/auth/getUserDetails.function";
import serverLogout from "./controllers/auth/serverLogout.function";

class App extends Component {
  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.state = {
      user: user.guest,
      main_language: languages.French,
      isSessionChecked: false
    };
  }

  // this centralisation is needed for react to be aware of a change and rerender the components
  loginUser(email) {
    user.logInUser(email); //updates user data directly in user context
    this.setState({
      user: user.connected
    });
  }

  async logoutUser() {
    try {
      let confirmation = await serverLogout();
      if (confirmation === "user logged out") {
        this.setState({
          user: user.guest
        });
      }
      user.logOutUser();
    } catch (e) {
      console.log("error while trying to log out");
    }
  }

  // automatic language and session detection on first page rendering
  // otherwise triggered by login/logout actions
  async componentDidMount() {
    if (!this.state.isSessionChecked) {
      let userData = await getUserDetails();
      if (userData !== "no active session") {
        userData = JSON.parse(userData);
        this.loginUser(userData.email);
      }
      this.setState({
        isSessionChecked: true
      });
      if (!/fr/i.test(window.navigator.language)) {
        this.setState({
          main_language: languages.English
        });
      }
    }
  }

  render() {
    // TO DO : waiting screen or animation ?
    // allows the user context to load before rendering children components, critical when loading other page than home first
    if (!this.state.isSessionChecked) {
      return null;
    } else
      return (
        <UserContext.Provider value={this.state.user}>
          <LanguageContext.Provider value={this.state.main_language}>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/home" />} />
              <Route
                exact
                path="/:themeId/:lessonId/test"
                component={FullScreenLayout}
              />
              <Route
                path="/"
                render={props => (
                  <MainLayout
                    {...props}
                    logoutUser={this.logoutUser}
                    loginUser={this.loginUser}
                  />
                )}
              />
            </Switch>
          </LanguageContext.Provider>
        </UserContext.Provider>
      );
  }
}

export default App;
