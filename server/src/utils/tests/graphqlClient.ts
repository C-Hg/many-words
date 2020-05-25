import ApolloClient from "apollo-boost";
import { execute } from "apollo-link";
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

const exercisesLink = new HttpLink({
  uri: `http://localhost:${process.env.SERVER_PORT}/exercises`,
  fetch,
});

const authorizationLinkWithJwt = new HttpLink({
  uri: `http://localhost:${process.env.SERVER_PORT}/authorization`,
  fetch,
});

const exercisesLinkWithJwt = new HttpLink({
  uri: `http://localhost:${process.env.SERVER_PORT}/exercises`,
  fetch,
  // headers: {
  //   authorization:
  // }
});

const exercisesGraphql = ({ query, variables = {} }) =>
  execute(exercisesLink, { query, variables });

// const exercisesGraphqlWithJwt = ({ query, variables = {} }) =>
//   execute(unauthenticatedLink, { query, variables });

export { authorizationClient, exercisesGraphql };
