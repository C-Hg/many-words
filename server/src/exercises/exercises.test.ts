import { toPromise, execute } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import gql from "graphql-tag";
import fetch from "node-fetch";

import logger from "../logger";

const EXERCISE_QUERY = gql`
  query exercise($id: Lesson!) {
    exercise(id: $id) {
      answers
      englishName
      form
      language
      lesson
      topic
      wordToTranslate
    }
  }
`;

// TODO: manage JWT https://blog.logrocket.com/writing-end-to-end-tests-for-graphql-servers-using-jest/
// TODO: docker with watch to use secrets, with different ports
describe("Exercises - e2e", () => {
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

  // TODO : test for a first lesson and then with results for this lesson
  it("should get exercise animalsBasics", async () => {
    const res = await toPromise(
      graphql({
        query: EXERCISE_QUERY,
        variables: { id: "animalsBasics" },
      })
    );

    logger.info(JSON.stringify(res));
    // expect(res).toMatchSnapshot();
  });
});
