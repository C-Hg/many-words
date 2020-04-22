import { toPromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import fetch from "node-fetch";

import secrets from "./config/secrets";

const USER_QUERY = gql`
  query user {
    user {
      id
      email
    }
  }
`;

// TODO: manage JWT https://blog.logrocket.com/writing-end-to-end-tests-for-graphql-servers-using-jest/
// TODO: docker with watch to use secrets, with different ports
describe("Server - e2e", () => {
  // --------------------->
  const link = new HttpLink({
    uri: `http://localhost:4000/graphql`,
    fetch,
    // headers: {
    //   authorization:
    // }
  });

  const graphql = ({ query, variables = {} }) =>
    execute(link, { query, variables });
  // <------------------------- get out in a file to call graphql with or without auth
  // and tests e2e next to the schemas
  // next to server : test auth or not

  it.only("gets user", async () => {
    const res = await toPromise(
      graphql({
        query: USER_QUERY,
      })
    );

    expect(res).toMatchSnapshot();
  });
});
