import { ObjectId } from "mongodb";
import Mongoose from "mongoose";

import {
  COMPLETION_THRESHOLDS,
  LAST_LESSON_MINIMUM_COMPLETION,
  PENULTIMATE_LESSON_MINIMUM_COMPLETION,
  SUCCESS_RATES,
} from "./constants";
import exercisesService from "./exercises.service";
import CurriculumModel from "./models/curriculum.model";
import { ThresholdsStatus } from "./types/completionThreshold.type";
import {
  CurriculumNames,
  LessonCompletion,
  NextExercise,
  NextExerciseMode,
} from "./types/curriculum.interface";

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

  /* ----------------            areThresholdsMet()            ----------       */
  it("should return met, i.e. all thresholds are met", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
    ];
    const result = exercisesService.areThresholdsMet(
      0,
      lessons,
      COMPLETION_THRESHOLDS.LESS_THAN_FIVE
    );
    expect(result).toEqual(ThresholdsStatus.met);
  });

  it("should return met, i.e. all thresholds are met", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
    ];
    const result = exercisesService.areThresholdsMet(
      0,
      lessons,
      COMPLETION_THRESHOLDS.LESS_THAN_TEN
    );
    expect(result).toEqual(ThresholdsStatus.met);
  });

  it("should return met, i.e. all thresholds are met", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" }, // 10
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.4, name: "1" }, // 20
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" }, // 26
    ];
    const result = exercisesService.areThresholdsMet(
      0,
      lessons,
      COMPLETION_THRESHOLDS.LESS_THAN_THIRTY
    );
    expect(result).toEqual(ThresholdsStatus.met);
  });

  it("should return the first threshold (90% at tier 2)", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" }, // 10
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.4, name: "1" }, // 20
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.3, name: "1" },
      { completion: 0.3, name: "1" },
      { completion: 0.3, name: "1" },
      { completion: 0.3, name: "1" }, // 26
    ];
    const result = exercisesService.areThresholdsMet(
      0,
      lessons,
      COMPLETION_THRESHOLDS.LESS_THAN_THIRTY
    );
    expect(result).toEqual(SUCCESS_RATES.TIER_2);
  });

  it("should return the second threshold (70% at tier 3)", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" }, // 10
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.4, name: "1" }, // 20
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" }, // 26
    ];
    const result = exercisesService.areThresholdsMet(
      0,
      lessons,
      COMPLETION_THRESHOLDS.LESS_THAN_THIRTY
    );
    expect(result).toEqual(SUCCESS_RATES.TIER_3);
  });

  it("should return the third threshold (20% at tier 4)", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.7, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" }, // 10
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.4, name: "1" }, // 20
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" },
      { completion: 0.4, name: "1" }, // 26
    ];
    const result = exercisesService.areThresholdsMet(
      0,
      lessons,
      COMPLETION_THRESHOLDS.LESS_THAN_THIRTY
    );
    expect(result).toEqual(SUCCESS_RATES.TIER_4);
  });

  /* ----------------            getThesholdsSuccessRate()            ----------       */
  it("should compute properly the success rate, 0", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
    ];
    const result = exercisesService.getThresholdSuccessRate(lessons, 0.9);
    expect(result).toEqual(0);
  });

  it("should compute properly the success rate, 1", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
    ];
    const result = exercisesService.getThresholdSuccessRate(lessons, 0.8);
    expect(result).toEqual(1);
  });
  it("should compute properly the success rate, 1", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
    ];
    const result = exercisesService.getThresholdSuccessRate(lessons, 0.3);
    expect(result).toEqual(1);
  });

  it("should compute properly the success rate, 0.5", () => {
    const lessons: LessonCompletion[] = [
      { completion: 0.1, name: "1" },
      { completion: 0.6, name: "1" },
      { completion: 0.8, name: "1" },
      { completion: 0.8, name: "1" },
    ];
    const result = exercisesService.getThresholdSuccessRate(lessons, 0.8);
    expect(result).toEqual(0.5);
  });
});
