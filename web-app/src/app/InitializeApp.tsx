import { ApolloQueryResult, useApolloClient } from "@apollo/client";
import React, { useEffect, useState } from "react";

import App from "./App";
import GET_ACCESS_TOKEN from "./graphql/getAccessToken.graphql";

import { apolloClient } from "../apolloClient";
import { isUserConnectedVar } from "../cache";
import { Query } from "../graphql/types";

const InitializeApp: React.FC = () => {
  const [isConnectionChecked, setIsConnectionChecked] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const getNewAccessToken = async () => {
      const { data }: ApolloQueryResult<Query> = await client.query({
        query: GET_ACCESS_TOKEN,
        fetchPolicy: "network-only",
      });
      setIsConnectionChecked(true);
      if (data.getAccessTokenWebUser.success) {
        isUserConnectedVar(true);
      } else {
        // clear the cache
        apolloClient.resetStore();
      }
    };

    if (!isConnectionChecked) {
      getNewAccessToken();
    }
  });

  if (isConnectionChecked) {
    return <App />;
  }
  // TODO: loading screen?
  return null;
};

export default InitializeApp;
