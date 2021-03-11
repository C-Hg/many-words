import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

import {
  COMPLETION_THRESHOLDS,
  CurriculumNames,
  LAST_LESSON_MINIMUM_COMPLETION,
  NextExerciseMode,
  PENULTIMATE_LESSON_MINIMUM_COMPLETION,
} from "./constants";
import exercisesService from "./exercises.service";
import CurriculumModel from "./models/curriculum.model";
import { LessonCompletion, NextExercise } from "./types/curriculum.interface";

import getDbConnection from "../utils/tests/dbConnection";

let db: typeof Mongoose;

/**
 * exercises.service unit tests
 */
describe("exercises.service unit tests", () => {
  beforeAll(async () => {
    db = await getDbConnection();
  });

  afterAll(async () => {
    await CurriculumModel.deleteMany({
      userId: {
        $in: [ID_1, ID_2],
      },
    });
    await db.connection.close();
  });

  const ID_1 = new ObjectId();
  const ID_2 = new ObjectId();

  /* ----------------            createCurriculum()            ---------------- */
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
  });

  /* ----------------            shouldDoLastLesson()            ----------       */
  it("should do the last lesson again", () => {
    const lessons: LessonCompletion[] = [
      {
        name: "lesson1",
        completion: LAST_LESSON_MINIMUM_COMPLETION - 0.02,
      },
    ];
    const response = exercisesService.shouldDoLastLesson(lessons);
    expect(response).toBe(true);
  });

  it("should not do the last lesson again", () => {
    const lessons: LessonCompletion[] = [
      { name: "lesson1", completion: LAST_LESSON_MINIMUM_COMPLETION },
    ];
    const response = exercisesService.shouldDoLastLesson(lessons);
    expect(response).toBe(false);
  });

  /* ----------------            shouldDoPenultimateLesson()            ----------       */
  it("should do the penultimate lesson again", () => {
    const lessons: LessonCompletion[] = [
      {
        name: "penultimateLesson1",
        completion: PENULTIMATE_LESSON_MINIMUM_COMPLETION - 0.02,
      },
      {
        name: "lesson1",
        completion: LAST_LESSON_MINIMUM_COMPLETION - 0.02,
      },
    ];
    const response = exercisesService.shouldDoPenultimateLesson(lessons);
    expect(response).toBe(true);
  });

  it("should not do the penultimate lesson again", () => {
    const lessons: LessonCompletion[] = [
      {
        name: "penultimateLesson1",
        completion: PENULTIMATE_LESSON_MINIMUM_COMPLETION + 0.02,
      },
      { name: "lesson1", completion: LAST_LESSON_MINIMUM_COMPLETION },
    ];
    const response = exercisesService.shouldDoPenultimateLesson(lessons);
    expect(response).toBe(false);
  });

  /* ----------------            setNextExercise()            ----------       */
  it("should update the next Exercise", async () => {
    await exercisesService.createCurriculum(ID_2.toHexString());
    const newDocument = await CurriculumModel.findOne({
      userId: ID_2,
    });
    const nextExercise: NextExercise = {
      mode: NextExerciseMode.quiz,
      ressourceId: "dolphins",
    };
    await exercisesService.setNextExercise(newDocument?.id, nextExercise);
    const updatedDocument = await CurriculumModel.findById(newDocument?.id);
    expect(updatedDocument?.nextExercise).toMatchObject(nextExercise);
  });

  /* ----------------            getCompletionThresholds()            ----------       */
  it("should return the threshold for less than five", () => {
    const completionThresholds = exercisesService.getCompletionThresholds(3);
    expect(completionThresholds).toEqual(COMPLETION_THRESHOLDS.LESS_THAN_FIVE);
  });
  it("should return the threshold for less than ten", () => {
    const completionThresholds = exercisesService.getCompletionThresholds(5);
    expect(completionThresholds).toEqual(COMPLETION_THRESHOLDS.LESS_THAN_TEN);
  });
  it("should return the threshold for less than forty", () => {
    const completionThresholds = exercisesService.getCompletionThresholds(39);
    expect(completionThresholds).toEqual(COMPLETION_THRESHOLDS.LESS_THAN_FORTY);
  });
  it("should return the threshold for more than forty", () => {
    const completionThresholds = exercisesService.getCompletionThresholds(40);
    expect(completionThresholds).toEqual(COMPLETION_THRESHOLDS.MORE_THAN_FORTY);
  });
});
