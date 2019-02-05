import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.scss";
import "./style_common/material_icons.css";

// Contexts
import { LanguageContext, languages } from "./contexts/language-context";
import { UserContext, user } from "./contexts/user-context";

// Layouts
import MainLayout from "./layouts/Main.layout";
import FullScreenLayout from "./layouts/FullScreen.layout";
import HomeLayout from "./layouts/Home.layout";

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
      this.setState({
        isSessionChecked: true
      });
      if (userData !== "no active session") {
        userData = JSON.parse(userData);
        this.loginUser(userData.email);
      }
      if (!/fr/i.test(window.navigator.language)) {
        this.setState({
          main_language: languages.English
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
            <Route
              exact
              path="/home"
              render={props => (
                <HomeLayout
                  {...props}
                  logoutUser={this.logoutUser}
                  loginUser={this.loginUser}
                />
              )}
            />
            <Route
              exact
              path="/:themeId/:lessonId/test"
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
