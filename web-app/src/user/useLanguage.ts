import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import GET_USER_LANGUAGE from "./graphql/getUserLanguage.graphql";
import SET_LANGUAGE from "./graphql/setLanguage.graphql";

import { GetUserLanguageQueryResult, Languages } from "../graphql/types";
import getBrowserLanguage from "../utils/getBrowserLanguage";

const useLanguage = () => {
  const apolloClient = useApolloClient();
  const [language, setLanguage] = useState<Languages | null>(null);
  const { data, loading }: GetUserLanguageQueryResult = useQuery(
    GET_USER_LANGUAGE
  );

  useEffect(() => {
    if (!language && !loading) {
      if (data?.user?.language) {
        // the user has already set its preferred language, use it
        setLanguage(data.user.language);
      } else {
        // we don't know user preferences yet, infer it from the browser
        const browserLanguage = getBrowserLanguage();
        setLanguage(browserLanguage);
        apolloClient.mutate({
          mutation: SET_LANGUAGE,
          variables: { language: browserLanguage },
        });
      }
    }
  }, [apolloClient, data, language, loading]);

  return language;
};

export default useLanguage;
