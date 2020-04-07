/* eslint-disable @typescript-eslint/camelcase */
import updateGlobalLessonsStats from "./updateGlobalLessonsStats.function";

import { LessonsStats } from "../../interfaces/lessonsStats.interface";

const lessonsStats0: Partial<LessonsStats> = {
  colors: {
    main_colors: 0.15222,
  },
};

const lessonsStats1: Partial<LessonsStats> = {
  colors: {
    main_colors: 0.4,
  },
  animals: {
    animals_basics: 0.6,
    insects: 0.1,
    birds: 0.2,
  },
};

const lessonsStats2: Partial<LessonsStats> = {
  colors: {
    main_colors: 0.1666,
  },
  animals: {
    animals_basics: 0.2,
    insects: 0.9,
    birds: 0.5,
    farm_animals: 0.4,
    mammals_1: 0.8,
  },
  food: {
    food_basics: 0.2,
    fruits: 0.35,
    vegetables: 0.6,
    vegetals_basics: 1,
    more_fruits_and_vegetables: 0,
  },
};

describe("updateGlobalLessonsStats", () => {
  test("first lesson", () => {
    const updatedStats = updateGlobalLessonsStats(lessonsStats0);
    expect(updatedStats).toMatchObject({
      updatedStudiedLessons: 1,
      updatedGreenLessons: 0,
      updatedGoldLessons: 0,
    });
  });

  test("new lesson", () => {
    const updatedStats = updateGlobalLessonsStats(lessonsStats1);
    expect(updatedStats).toMatchObject({
      updatedStudiedLessons: 4,
      updatedGreenLessons: 2,
      updatedGoldLessons: 0,
    });
  });

  test("new lesson", () => {
    const updatedStats = updateGlobalLessonsStats(lessonsStats2);
    expect(updatedStats).toMatchObject({
      updatedStudiedLessons: 11,
      updatedGreenLessons: 3,
      updatedGoldLessons: 3,
    });
  });
});
