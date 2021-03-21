import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

import exercisesController from "./exercises.controller";
import exercisesService from "./exercises.service";
import CurriculumModel from "./models/curriculum.model";

import User from "../user/models/user.model";
import createTestUser from "../utils/tests/createTestUser";
import getDbConnection from "../utils/tests/dbConnection";
import { getAuthenticatedClient } from "../utils/tests/graphqlClient";

let db: typeof Mongoose;

/**
 * exercises.controller unit tests
 */
describe("exercises.controller unit tests", () => {
  beforeAll(async () => {
    db = await getDbConnection();
  });

  afterAll(async () => {
    await User.deleteMany({
      _id: {
        $in: [ID_1],
      },
    });
    await CurriculumModel.deleteMany({
      userId: {
        $in: [ID_1],
      },
    });
    await db.connection.close();
  });

  const ID_1 = new ObjectId();

  /* ----------------            selectNextExercise()            ---------------- */
  it("should set the next exercise for the curriculum, after the first one is successful", async () => {
    const doc = await exercisesService.createCurriculum(ID_1.toHexString());
    await CurriculumModel.findOneAndUpdate(
      { userId: ID_1.toHexString() },
      {
        lessons: [{ completion: 0.2, name: "animalsBasics" }],
      }
    );
    await exercisesController.selectNextExercise(ID_1.toHexString());
    const doc1 = await CurriculumModel.findById(doc.id);
    expect(doc1?.nextExercise).toMatchObject({
      mode: "quiz",
      ressourceId: "humanBodyBasics",
    });
  });
});
