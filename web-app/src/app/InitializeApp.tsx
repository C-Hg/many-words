import {
  ApolloQueryResult,
  FetchResult,
  useApolloClient,
} from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Mutation, Query } from "../graphql/types";
import CREATE_WEB_USER from "./graphql/createUser.graphql";
import GET_ACCESS_TOKEN from "./graphql/getAccessToken.graphql";

const InitializeApp: React.FC = () => {
  const [isUserConnected, setIsUserConnected] = useState(false);
  const client = useApolloClient();

  useEffect(() => {
    const getNewAccessToken = async () => {
      console.info("fetching access token");
      // const {
      //   data: data1,
      //   error,
      // }: ApolloQueryResult<Query> = await client.query({
      //   query: GET_USER_LANGUAGE,
      // });
      // console.warn(data1, error);

      const { data }: ApolloQueryResult<Query> = await client.query({
        query: GET_ACCESS_TOKEN,
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
