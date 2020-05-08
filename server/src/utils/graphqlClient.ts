import { execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import fetch from "node-fetch";

/**
 * Building graphql clients for e2e tests
 */
const unauthorizedLink = new HttpLink({
  uri: `http://localhost:4000/graphql`,
  fetch,
  // headers: {
  //   authorization:
  // }
});

const link = new HttpLink({
  uri: `http://localhost:4000/graphql`,
  fetch,
  // headers: {
  //   authorization:
  // }
});

const unauthorizedGraphql = ({ query, variables = {} }) =>
  execute(unauthorizedLink, { query, variables });

const graphql = ({ query, variables = {} }) =>
  execute(link, { query, variables });

export { unauthorizedGraphql, graphql };
