import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { ThemeProvider } from "styled-components";
import { languages, LanguageContext } from "../contexts/language-context";
import Router from "./Router";
import theme from "./theme";

// const GET_USER_STATS = `
//   query getUserStats
// `

const App = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSessionChecked, setIsSessionChecked] = useState(false);

  // TODO: get the language of the user with its stats, if no user is logged in, retrieve browser language,
  // initialize context with it and set the value in local apollo store to later create the user with it

  // automatic language and session detection on first page rendering
  useEffect(() => {
    if (!isSessionChecked) {
      checkSession();
      defineLanguage();
      setIsSessionChecked(true);
    }
  }, [isSessionChecked]);

  // allows the language context to load before rendering children components, critical when loading other page than home first
  if (!isSessionChecked) {
    // TODO : waiting screen or animation ?
    return null;
  }

  return (
    // the language context depends on the language value in the redux store
    <LanguageContext.Provider value={languages[user.language]}>
      <ThemeProvider theme={theme}>
        <Router isConnected={isConnected} />
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

// TODO: Router as a provider ?
export default withRouter(App);
