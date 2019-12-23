import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { ThemeProvider } from "styled-components";
import { actions as userActions } from "../redux/reducers/user";
import { languages, LanguageContext } from "../contexts/language-context";
import Router from "./Router";
import theme from "./theme";

const mapStateToProps = state => ({ user: state.user });
const mapDispatchToProps = dispatch => ({
  defineLanguage: () => {
    dispatch(userActions.defineLanguage());
  },
  checkSession: () => {
    dispatch(userActions.checkSession());
  },
});

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
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </LanguageContext.Provider>
  );
};

App.propTypes = {
  user: PropTypes.shape({
    language: PropTypes.string.isRequired,
  }).isRequired,
  checkSession: PropTypes.func.isRequired,
  defineLanguage: PropTypes.func.isRequired,
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
