import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

import { CurriculumNames } from "./constants";
import exercisesService from "./exercises.service";
import CurriculumModel from "./models/curriculum.model";

import getDbConnection from "../utils/tests/dbConnection";

let db: typeof Mongoose;

describe("Exercises - e2e", () => {
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

  describe("exercises unit tests", () => {
    /*  ---------------      exercises.service      ----------------- */
    it("should create a new curriculum document", async () => {
      await exercisesService.createCurriculum(ID_1.toHexString());
      const newDocument = await CurriculumModel.findOne({
        userId: ID_1,
      });

      expect(newDocument?.nextExercise).toMatchObject({
        mode: "quiz",
        ressourceId: "animalsBasics",
      });
      expect(newDocument?.name).toEqual(CurriculumNames.frenchEnglish);
      expect(newDocument?.lessons.length).toEqual(0);
      expect(newDocument?.exercisesSinceWeakWords).toEqual(0);
      expect(true).toBe(true);
    });
  });
});
