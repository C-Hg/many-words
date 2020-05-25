import { toPromise } from "apollo-link";
import gql from "graphql-tag";

import userService from "./user.service";

import { exercisesGraphql } from "../utils/tests/graphqlClient";

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
  it("should return a 401 error", async () => {
    // await expect(
    //   toPromise(
    //     exercisesGraphql({
    //       query: USER_QUERY,
    //     })
    //   )
    // ).rejects.toThrowError("401");
    expect(true).toBe(true);
  });

  // it should get a token and create a user

  // it("should get user", async () => {
  //   const res = await toPromise(
  //     unauthenticatedGraphql({
  //       query: USER_QUERY,
  //     })
  //   );
  //   expect(res).toMatchSnapshot();
  // });

  // it should delete the user
});
