import updateGlobalLessonsStats from "./updateGlobalLessonsStats.function";

import { LessonsStats } from "../../../graphql/types";

const lessonsStats0: Partial<LessonsStats> = {
  colors: {
    mainColors: 0.15222,
  },
};

const lessonsStats1: Partial<LessonsStats> = {
  colors: {
    mainColors: 0.4,
  },
  animals: {
    animalsBasics: 0.6,
    insects: 0.1,
    birds: 0.2,
  },
};

const lessonsStats2: Partial<LessonsStats> = {
  colors: {
    mainColors: 0.1666,
  },
  animals: {
    animalsBasics: 0.2,
    insects: 0.9,
    birds: 0.5,
    farmAnimals: 0.4,
    mammals1: 0.8,
  },
  food: {
    foodBasics: 0.2,
    fruits: 0.35,
    vegetables: 0.6,
    vegetalBasics: 1,
    moreFruitsAndVegetables: 0,
  },
};

describe("updateGlobalLessonsStats", () => {
  test("first lesson", () => {
    const updatedStats = updateGlobalLessonsStats(lessonsStats0);
    expect(updatedStats).toMatchObject({
      studiedLessons: 1,
      greenLessons: 0,
      goldLessons: 0,
    });
  });

  test("new lesson", () => {
    const updatedStats = updateGlobalLessonsStats(lessonsStats1);
    expect(updatedStats).toMatchObject({
      studiedLessons: 4,
      greenLessons: 2,
      goldLessons: 0,
    });
  });

  test("new lesson 2", () => {
    const updatedStats = updateGlobalLessonsStats(lessonsStats2);
    expect(updatedStats).toMatchObject({
      studiedLessons: 11,
      greenLessons: 3,
      goldLessons: 3,
    });
  });
});
