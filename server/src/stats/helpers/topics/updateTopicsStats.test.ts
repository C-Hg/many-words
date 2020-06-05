import updateTopicsStats from "./updateTopicsStats.function";

import { LessonsScores } from "../../../graphql/learn.types";

const LessonsScores0: LessonsScores = {
  mainColors: 0.4,
};

const LessonsScores1: LessonsScores = {
  mainColors: 0.2,
  animalsBasics: 0.6,
  insects: 0.1,
  birds: 0.2,
  // "farmAnimals",
  // "mammals1",
  // "sea_animals",
};

const LessonsScores2: LessonsScores = {
  mainColors: 1,
  animalsBasics: 0.8,
  insects: 0.4,
  birds: 0.41,
  // "farmAnimals",
  // "mammals1",
  // "sea_animals",
  agriculture: 1,
  drinks: 0.8,
  foodBasics: 0.9,
  foods: 0.5,
  fruits: 0.1,
  moreFruitsAndVegetables: 0.15,
  vegetables: 0.34444,
  constructionMaterials: 0.1,
  constructionTools: 0.4,
  // furniture: ,
  // house: ,
  // housing: ,
  // rooms: ,
};

const LessonsScores3: LessonsScores = {
  mainColors: 0,
  animalsBasics: 0,
  insects: 0,
  birds: 0,
  farmAnimals: 0,
};

describe("updateTopicsStats", () => {
  test("single lesson", () => {
    const updatedTopics = updateTopicsStats(LessonsScores0);
    expect(updatedTopics).toMatchObject([
      {
        id: "colors",
        lessonsGrades: {
          green: 1,
          gold: 0,
        },
      },
    ]);
  });

  test("two topics, one incomplete", () => {
    const updatedTopics = updateTopicsStats(LessonsScores1);
    expect(updatedTopics).toMatchObject([
      {
        id: "animals",
        lessonsGrades: {
          green: 1,
          gold: 0,
        },
      },
      {
        id: "colors",
        lessonsGrades: {
          green: 0,
          gold: 0,
        },
      },
    ]);
  });

  test("four topics, one complete", () => {
    const updatedTopics = updateTopicsStats(LessonsScores2);
    expect(updatedTopics).toMatchObject([
      {
        id: "animals",
        lessonsGrades: {
          green: 2,
          gold: 1,
        },
      },
      {
        id: "colors",
        lessonsGrades: {
          green: 0,
          gold: 1,
        },
      },
      {
        id: "food",
        lessonsGrades: {
          green: 1,
          gold: 3,
        },
      },
      {
        id: "habitation",
        lessonsGrades: {
          green: 1,
          gold: 0,
        },
      },
    ]);
  });

  test("lessons at 0 : should produce an empty array", () => {
    const updatedTopics = updateTopicsStats(LessonsScores3);
    expect(updatedTopics).toMatchObject([]);
  });
});
