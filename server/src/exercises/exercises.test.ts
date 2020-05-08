import { toPromise } from "apollo-link";
import gql from "graphql-tag";

import { unauthorizedGraphql } from "../utils/graphqlClient";

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

describe("Exercises - e2e", () => {
  // TODO : test for a first lesson and then with results for this lesson
  it("should get exercise animalsBasics", async () => {
    const res = await toPromise(
      unauthorizedGraphql({
        query: EXERCISE_QUERY,
        variables: { id: "animalsBasics" },
      })
    );

    // expect(res).toMatchSnapshot();
  });
});
