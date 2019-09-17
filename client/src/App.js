import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import "./App.scss";
import "./styles/common/material_icons.css";
import "./styles/common/titles.scss";
import "./styles/common/layouts.scss";
import "./styles/common/buttons.scss";
import "./styles/common/variables.scss";
import { connect } from "react-redux";
import { actions as userActions } from "./redux/reducers/user";
import { languages, LanguageContext } from "./contexts/language-context";
import Router from "./router/Router";

function mapStateToProps(state) {
  return { user: state.user };
}

const mapDispatchToProps = dispatch => {
  return {
    defineLanguage: () => {
      dispatch(userActions.defineLanguage());
    },
    checkSession: () => {
      dispatch(userActions.checkSession());
    }
  };
};

const App = props => {
  const { user, checkSession, defineLanguage } = props;
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  // automatic language and session detection on first page rendering
  useEffect(() => {
    if (!isSessionChecked) {
      checkSession();
      defineLanguage();
      setIsSessionChecked(true);
    }
  }, [checkSession, defineLanguage, isSessionChecked]);

  // TODO : waiting screen or animation ?
  // allows the language context to load before rendering children components, critical when loading other page than home first
  if (!isSessionChecked) {
    return null;
  }
  return (
    // the language context depends on the language value in the redux store
    <LanguageContext.Provider value={languages[user.language]}>
      <Router />
    </LanguageContext.Provider>
  );
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
