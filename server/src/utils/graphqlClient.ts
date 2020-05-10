import { execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

/**
 * Building graphql clients for e2e tests
 */
const authenticationLink = new HttpLink({
  uri: `http://localhost:4000/authentication`,
  fetch,
});

const exercisesLink = new HttpLink({
  uri: `http://localhost:4000/exercises`,
  fetch,
});

const authenticationLinkWithJwt = new HttpLink({
  uri: `http://localhost:4000/authentication`,
  fetch,
});

const exercisesLinkWithJwt = new HttpLink({
  uri: `http://localhost:4000/exercises`,
  fetch,
  // headers: {
  //   authorization:
  // }
});

// TODO: clean and getWithJwt function
const authenticationGraphql = ({ query, variables = {} }) =>
  execute(authenticationLink, { query, variables });

const exercisesGraphql = ({ query, variables = {} }) =>
  execute(exercisesLink, { query, variables });

// const exercisesGraphqlWithJwt = ({ query, variables = {} }) =>
//   execute(unauthenticatedLink, { query, variables });

export { exercisesGraphql, authenticationGraphql };
