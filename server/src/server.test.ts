import { toPromise } from "apollo-link";
import gql from "graphql-tag";

import { unauthorizedGraphql } from "./utils/graphqlClient";

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
  // and tests e2e next to the schemas
  // next to server : test auth or not

  it("should get user", async () => {
    const res = await toPromise(
      unauthorizedGraphql({
        query: USER_QUERY,
      })
    );

    expect(res).toMatchSnapshot();
  });
});
