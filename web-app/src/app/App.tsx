import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";

import Router from "./Router";
import theme from "./theme";

import { languages, LanguageContext } from "../contexts/language-context";
import { GetUserLanguageQueryResult, Languages } from "../graphql/types";
import getLanguage from "../utils/getLanguage";
import GET_USER_LANGUAGE from "./graphql/getUserLanguage.graphql";

// TODO: check the connexion status in Index.tsx
const App: React.FC = () => {
  const [language, setLanguage] = useState<Languages | null>(null);
  const { loading, data }: GetUserLanguageQueryResult = useQuery(
    GET_USER_LANGUAGE
  );

  // allows the language context to load before rendering children components, critical when loading other page than home first
  if (loading) {
    // TODO: loading animation
    return null;
  }

  if (data?.user?.language) {
    // the user has already set its preferred language, use it
    setLanguage(data.user.language);
  } else {
    // we don't know user preferences yet, infer it from the browser
    setLanguage(getLanguage());
  }

  if (!language) {
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
