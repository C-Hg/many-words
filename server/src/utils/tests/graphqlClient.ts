import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import fetch from "cross-fetch";

// cf. docker-compose.test file
const SERVER_SERVICE = "test-server";

/**
 * Building graphql clients for e2e tests
 */
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([
    onError(() => {
      // do not print error messages, some tests are expected to throw
      return;
    }),
    new HttpLink({
      fetch,
      uri: `https://${SERVER_SERVICE}:${process.env.SERVER_PORT}/graphql`,
    }),
  ]),
});

const getAuthenticatedClient = (accessToken: string): ApolloClient<unknown> => {
  const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext({
      headers: {
        authorization: accessToken,
      },
    });
    return forward(operation);
  });

  return new ApolloClient({
    cache: new InMemoryCache(),
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
      },
    },
    link: ApolloLink.from([
      onError(() => {
        return;
      }),
      authMiddleware,
      new HttpLink({
        fetch,
        uri: `https://${SERVER_SERVICE}:${process.env.SERVER_PORT}/graphql`,
      }),
    ]),
  });
};

export { getAuthenticatedClient, client };
