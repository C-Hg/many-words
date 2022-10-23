import { useApolloClient, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import GET_IS_USER_CONNECTED from "./graphql/getIsUserConnected.graphql.local";
import GET_USER_LANGUAGE from "./graphql/getUserLanguage.graphql";
import SET_LANGUAGE from "./graphql/setLanguage.graphql";

import { Languages, Query } from "../graphql/types";
import getBrowserLanguage from "../utils/getBrowserLanguage";

// TODO @V2: check the cache first, and use local var instead of useState?

const useLanguage = () => {
  const apolloClient = useApolloClient();
  const [language, setLanguage] = useState<Languages | null>(null);
  const {
    data: { isUserConnected },
    loading,
  } = useQuery(GET_IS_USER_CONNECTED);

  useEffect(() => {
    // only launch the language query if the user is connected
    const getOrSetLanguage = async () => {
      const { data } = await apolloClient.query<Query>({
        fetchPolicy: "network-only",
        query: GET_USER_LANGUAGE,
      });
      const userLanguage = data.user.language;

      if (userLanguage) {
        // the user has already set its preferred language, use it
        setLanguage(userLanguage);
      } else {
        // we don't know user preferences yet, infer it from the browser
        const browserLanguage = getBrowserLanguage();
        setLanguage(browserLanguage);
        apolloClient.mutate({
          mutation: SET_LANGUAGE,
          variables: { language: browserLanguage },
        });
      }
    };

    if (!loading) {
      // wait for the userConnected query to complete
      if (isUserConnected) {
        // user is connected, check their preferences
        getOrSetLanguage();
      } else {
        // user is not connected, infer preferences from browser language
        const browserLanguage = getBrowserLanguage();
        setLanguage(browserLanguage);
      }
    }
  }, [apolloClient, isUserConnected, language, loading]);

  return language;
};

export default useLanguage;
