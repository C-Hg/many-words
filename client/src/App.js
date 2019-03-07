import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import "./styles/common/material_icons.css";
import "./styles/common/titles.scss";
import "./styles/common/layouts.scss";
import "./styles/common/buttons.scss";
import "./styles/common/variables.scss";

// Contexts
import { LanguageContext, languages } from "./contexts/language-context";
import { UserContext, user } from "./contexts/user-context";

//functions
import getUserDetails from "./controllers/auth/getUserDetails.function";
import serverLogout from "./controllers/auth/serverLogout.function";
import deleteUserAccount from "./controllers/auth/deleteUserAccount.function";
import Exercise from "./pages/Exercise.page";
import AppWithNavbar from "./layouts/AppWithNavbar.layout";

class App extends Component {
  constructor(props) {
    super(props);
    this.loginUser = this.loginUser.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
    this.logoutAndDeleteUser = this.logoutAndDeleteUser.bind(this);
    this.startWeakWords = this.startWeakWords.bind(this);
    this.state = {
      user: user.guest,
      main_language: languages.French,
      isSessionChecked: false
    };
  }

  startWeakWords(event) {
    let context = event.target.getAttribute("context");
    let reference = event.target.getAttribute("reference");
    user.startWeakWords(context, reference);
    this.forceUpdate(); // forces rerendering and redirecting from curriculum to exercise after user context is updated!
  }

  // this centralisation is needed for react to be aware of a change and rerender the components
  loginUser() {
    this.setState({
      user: user.connected
    });
  }

  async logoutAndDeleteUser() {
    try {
      let confirmation = await deleteUserAccount();
      if (confirmation === "user deleted and logged out") {
        this.setState({
          user: user.guest
        });
      }
    } catch (e) {
      console.log("error while trying to delete user account");
    }
  }

  async logoutUser() {
    try {
      let confirmation = await serverLogout();
      if (confirmation === "user logged out") {
        this.setState({
          user: user.guest
        });
      }
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
        this.loginUser();
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
              <Route exact path="/weak_words" component={Exercise} />
              <Route
                exact
                path="/:themeId/:lessonId/test"
                component={Exercise}
              />
              <Route
                path={"/"}
                render={props => (
                  <AppWithNavbar
                    startWeakWords={this.startWeakWords}
                    lesson={props.match.params.lessonId}
                    theme={props.match.params.themeId}
                    logoutUser={this.logoutUser}
                    logoutAndDeleteUser={this.logoutAndDeleteUser}
                    loginUser={this.loginUser}
                    {...props}
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
