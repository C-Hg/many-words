import ApolloClient from "apollo-boost";
import { execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

import logger from "./logger";

import CONFIG from "../config/secrets";

/**
 * Building graphql clients for e2e tests
 */
const authorizationClient = new ApolloClient({
  uri: `http://localhost:${CONFIG.serverPort}/authorization`,
  fetch,
  onError: (e): void => {
    logger.error(JSON.stringify(e.response));
  },
});

const exercisesLink = new HttpLink({
  uri: `http://localhost:${CONFIG.serverPort}/exercises`,
  fetch,
});

const authorizationLinkWithJwt = new HttpLink({
  uri: `http://localhost:${CONFIG.serverPort}/authorization`,
  fetch,
});

const exercisesLinkWithJwt = new HttpLink({
  uri: `http://localhost:${CONFIG.serverPort}/exercises`,
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
