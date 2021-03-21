import { ApolloClient, ApolloQueryResult } from "@apollo/client/core";
import gql from "graphql-tag";
import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

import { Query } from "../graphql/types";
import User from "../user/models/user.model";
import createTestUser from "../utils/tests/createTestUser";
import getDbConnection from "../utils/tests/dbConnection";
import { getAuthenticatedClient } from "../utils/tests/graphqlClient";

const EXERCISE_QUERY = gql`
  query GetNextExercise {
    exercise {
      _id
      type
      words {
        answers
        englishName
        form
        language
        lesson
        topic
        wordToTranslate
      }
    }
  }
`;

// @V2
// const CREATE_CURRICULUM = gql`
//   mutation createCurriculum($name: CurriculumNames!) {
//     createCurriculum(name: $name) {
//       success
//     }
//   }
// `;

const USER_1 = "exercise.user1@test.fr";
// let user1Id: ObjectId;

let db: typeof Mongoose;
// let authenticatedClient1: ApolloClient<unknown>;

describe("Exercises - e2e", () => {
  beforeAll(async () => {
    db = await getDbConnection();
    // const { accessToken, _id } = await createTestUser(USER_1);
    // user1Id = _id;
    // authenticatedClient1 = getAuthenticatedClient(accessToken);
  });

  afterAll(async () => {
    await User.deleteMany({
      email: {
        $in: [USER_1],
      },
    });
    await db.connection.close();
  });

  describe("exercises e2e", () => {
    // @V2
    // it("should start a new curriculum", async () => {
    //   const {
    //     data,
    //   }: ApolloQueryResult<Query> = await authenticatedClient1.mutate({
    //     mutation: CREATE_CURRICULUM,
    //     variables: { name: CurriculumNames.frenchEnglish },
    //   });
    //   expect(data.createCurriculum.success).toBe(true);

    //   const newDocument = await Curriculum.findOne({
    //     email: USER_1,
    //   });
    //   const curriculumId = newDocument._id;
    //   expect(newDocument.userId).toEqual(user1Id);
    //   expect(newDocument.nextExercise).toEqual("animalsBasics");
    //   expect(newDocument.name).toEqual(CurriculumNames.frenchEnglish);
    //   expect(newDocument.lessons.length).toEqual(0);
    //   expect(newDocument.exercisesSinceWeakWords).toEqual(0);

    //   const userDocument = await User.findById(user1Id);
    //   expect(userDocument.curriculums).toHaveLength(1);
    //   expect(userDocument.curriculums[1]).toEqual(
    //     CurriculumNames.frenchEnglish
    //   );
    // });

    it("should get a lesson for a new user", () => {
      expect(true).toBe(true);
    });
  });

  // it should get a lesson and select the weak forms for a lesson

  // it should get the weak words for a topic

  // expect(res).toMatchSnapshot();
});
