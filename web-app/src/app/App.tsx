import React from "react";
import { ThemeProvider } from "styled-components";

import Router from "./Router";
import theme from "./theme";

import { languages, LanguageContext } from "../contexts/language-context";
import useLanguage from "../user/useLanguage";

const App: React.FC = () => {
  const language = useLanguage();

  // allows the language context to load before rendering children components, critical when loading other page than home first
  if (!language) {
    // TODO: loading animation
    return null;
  }

  return (
    // the language context depends on the language value in the redux store
    <LanguageContext.Provider value={languages[language]}>
      <ThemeProvider theme={theme}>
        <Router />
      </ThemeProvider>
    </LanguageContext.Provider>
  );
};

export default App;
