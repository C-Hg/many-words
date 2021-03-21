import updateGlobalLessonsStats from "./updateGlobalLessonsStats.function";

import { LessonCompletion } from "../../../exercises/types/curriculum.interface";

const lessons0: LessonCompletion[] = [
  {
    name: "mainColors",
    completion: 0,
  },
];

const lessons1: LessonCompletion[] = [
  {
    name: "mainColors",
    completion: 0.4,
  },
  {
    name: "animalsBasics",
    completion: 0.6,
  },
  {
    name: "insects",
    completion: 0.1,
  },
  {
    name: "birds",
    completion: 0.2,
  },
];

const lessons2: LessonCompletion[] = [
  {
    name: "mainColors",
    completion: 0.1666,
  },
  {
    name: "animalsBasics",
    completion: 0.2,
  },
  {
    name: "insects",
    completion: 0.9,
  },
  {
    name: "birds",
    completion: 0.5,
  },
  {
    name: "farmAnimals",
    completion: 0.4,
  },
  {
    name: "mammals1",
    completion: 0.8,
  },
  {
    name: "foodBasics",
    completion: 0.2,
  },
  {
    name: "fruits",
    completion: 0.35,
  },
  {
    name: "vegetables",
    completion: 0.6,
  },
  {
    name: "vegetalBasics",
    completion: 1,
  },
  {
    name: "moreFruitsAndVegetables",
    completion: 0,
  },
];

describe("updateGlobalLessonsStats", () => {
  test("first lesson", () => {
    const updatedStats = updateGlobalLessonsStats(lessons0);
    expect(updatedStats).toMatchObject({
      studiedLessons: 1,
      greenLessons: 0,
      goldLessons: 0,
    });
  });

  test("new lesson", () => {
    const updatedStats = updateGlobalLessonsStats(lessons1);
    expect(updatedStats).toMatchObject({
      studiedLessons: 4,
      greenLessons: 2,
      goldLessons: 0,
    });
  });

  test("new lesson 2", () => {
    const updatedStats = updateGlobalLessonsStats(lessons2);
    expect(updatedStats).toMatchObject({
      studiedLessons: 11,
      greenLessons: 3,
      goldLessons: 3,
    });
  });
});
