import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

import exercisesController from "./exercises.controller";
import CurriculumModel from "./models/curriculum.model";

import getDbConnection from "../utils/tests/dbConnection";

let db: typeof Mongoose;

/**
 * exercises.controller unit tests
 */
describe("exercises.controller unit tests", () => {
  beforeAll(async () => {
    db = await getDbConnection();
  });

  afterAll(async () => {
    await CurriculumModel.deleteMany({
      userId: {
        $in: [ID_1],
      },
    });
    await db.connection.close();
  });

  const ID_1 = new ObjectId();

  /* ----------------            selectNextExercise()            ---------------- */
  it("should set the next exercise for the curriculum", async () => {
    const curriculum = await exercisesController.selectNextExercise(
      ID_1.toHexString()
    );
    expect(curriculum?.nextExercise).toMatchObject({
      mode: "quiz",
      ressourceId: "humanBodyBasics",
    });
  });
});
