import ApolloClient from "apollo-boost";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

// cf. docker-compose.test file
const SERVER_SERVICE = "test-server";

/**
 * Building graphql clients for e2e tests
 */
const authorizationClient = new ApolloClient({
  uri: `http://${SERVER_SERVICE}:${process.env.SERVER_PORT}/authorization`,
  fetch,
  // do not print error messages, some tests are expected to throw
  onError: (): void => {
    return;
  },
});

const learnClient = new ApolloClient({
  uri: `http://${SERVER_SERVICE}:${process.env.SERVER_PORT}/learn`,
  fetch,
  // do not print error messages, some tests are expected to throw
  onError: (): void => {
    return;
  },
});

const getAuthenticatedLearnClient = (
  authorization: string
): ApolloClient<unknown> =>
  new ApolloClient({
    uri: `http://${SERVER_SERVICE}:${process.env.SERVER_PORT}/learn`,
    fetch,
    headers: {
      authorization,
    },
    // do not print error messages, some tests are expected to throw
    onError: (): void => {
      return;
    },
  });

const exercisesLinkWithJwt = new HttpLink({
  uri: `http://localhost:${process.env.SERVER_PORT}/exercises`,
  fetch,
  // headers: {
  //   authorization:
  // }
});

export { authorizationClient, getAuthenticatedLearnClient, learnClient };
