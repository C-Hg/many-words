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
import MainLayoutGrey from "./layouts/Main.layout.grey";
import MainLayoutWhite from "./layouts/Main.layout.white";
import FullScreenLayout from "./layouts/FullScreen.layout";

//functions
import getUserDetails from "./controllers/auth/getUserDetails.function";
import serverLogout from "./controllers/auth/serverLogout.function";
import deleteUserAccount from "./controllers/auth/deleteUserAccount.function";

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
              <Route exact path="/about" component={MainLayoutWhite} />
              <Route
                exact
                path="/home"
                render={props => (
                  <MainLayoutWhite
                    logoutUser={this.logoutUser}
                    logoutAndDeleteUser={this.logoutAndDeleteUser}
                    loginUser={this.loginUser}
                    {...props}
                  />
                )}
              />
              <Route exact path="/weak_words" component={FullScreenLayout} />
              <Route
                exact
                path="/:themeId/:lessonId/test"
                component={FullScreenLayout}
              />
              <Route
                path="/"
                render={props => (
                  <MainLayoutGrey
                    startWeakWords={this.startWeakWords}
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
