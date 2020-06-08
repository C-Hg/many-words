import gql from "graphql-tag";

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
  // before all: get a valid JWT

  // TODO : test for a first lesson and then with results for this lesson
  // it("should get exercise animalsBasics", async () => {
  //   const res = await toPromise(
  //     unauthorizedGraphql({
  //       query: EXERCISE_QUERY,
  //       variables: { id: "animalsBasics" },
  //     })
  //   );
  describe("exercises e2e", () => {
    it("should get a lesson for the first time", () => {
      expect(true).toBe(true);
    });
  });

  // it should get a lesson and select the weak forms for a lesson

  // it should get the weak words for a topic

  // expect(res).toMatchSnapshot();
});
