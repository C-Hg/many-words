import {
  ApolloQueryResult,
  FetchResult,
  useApolloClient,
} from "@apollo/client";
import React, { useEffect, useState } from "react";

import App from "./App";
import CREATE_WEB_USER from "./graphql/createUser.graphql";
import GET_ACCESS_TOKEN from "./graphql/getAccessToken.graphql";

import { apolloClient } from "../apolloClient";
import { Mutation, Query } from "../graphql/types";

const InitializeApp: React.FC = () => {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const getNewAccessToken = async () => {
      const { data }: ApolloQueryResult<Query> = await client.query({
        query: GET_ACCESS_TOKEN,
        fetchPolicy: "network-only",
      });
      if (data.getAccessTokenWebUser.success) {
        setIsUserConnected(true);
      } else {
        // TODO: retry policy
        // clear the cache
        apolloClient.resetStore();
        const { data }: FetchResult<Mutation> = await client.mutate({
          mutation: CREATE_WEB_USER,
        });
        if (data?.createWebUser?.success) {
          setIsUserConnected(true);
        }
      }
    };
    if (!isUserConnected) {
      getNewAccessToken();
    }
  });
  console.info(isUserConnected);

  if (isUserConnected) {
    return <App />;
  }
  // TODO: loading screen?
  return null;
};

export default InitializeApp;
