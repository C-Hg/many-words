import {
  ApolloQueryResult,
  FetchResult,
  useApolloClient,
} from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Mutation, Query } from "../graphql/authorization.types";
import CREATE_WEB_USER from "./graphql/createUser.auth";
import GET_ACCESS_TOKEN_WEB from "./graphql/getAccessToken.auth";

const InitializeApp: React.FC = () => {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const getNewAccessToken = async () => {
      console.info("fetching access token");
      const { data }: ApolloQueryResult<Query> = await client.query({
        query: GET_ACCESS_TOKEN_WEB,
      });
      if (data.getAccessTokenWebUser.success) {
        setIsUserConnected(true);
      } else {
        console.info("creating new user");
        // TODO: retry policy
        const { data }: FetchResult<Mutation> = await client.mutate({
          mutation: CREATE_WEB_USER,
        });
        if (data?.createWebUser?.success) {
          setIsUserConnected(true);
        }
      }
    };
    if (!isUserConnected) {
      console.info("connecting user");
      getNewAccessToken();
    }
  });

  if (isUserConnected) {
    return (
      <div>
        <p>successfully connected</p>
      </div>
    );
  }
  return (
    <div>
      <p>no connection</p>
    </div>
  );
};

export default InitializeApp;
