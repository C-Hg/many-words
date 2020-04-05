import updateTopicsStats from "./updateTopicsStats.function";

import { LessonsStats } from "../../interfaces/lessonsStats.interface";

/* eslint-disable @typescript-eslint/camelcase */

const lessonsStats0: Partial<LessonsStats> = {
  colors: {
    main_colors: 0.4,
  },
};

const lessonsStats1: Partial<LessonsStats> = {
  colors: {
    main_colors: 0.2,
  },
  animals: {
    animals_basics: 0.6,
    insects: 0.1,
    birds: 0.2,
    // "farm_animals",
    // "mammals_1",
    // "sea_animals",
  },
};

const lessonsStats2: Partial<LessonsStats> = {
  colors: {
    main_colors: 1,
  },
  animals: {
    animals_basics: 0.8,
    insects: 0.4,
    birds: 0.41,
    // "farm_animals",
    // "mammals_1",
    // "sea_animals",
  },
  // all lessons taken
  food: {
    agriculture: 1,
    drinks: 0.8,
    food_basics: 0.9,
    foods: 0.5,
    fruits: 0.1,
    more_fruits_and_vegetables: 0.15,
    vegetables: 0.34444,
  },
  habitation: {
    construction_materials: 0.1,
    construction_tools: 0.4,
    // furniture: ,
    // house: ,
    // housing: ,
    // rooms: ,
  },
};

describe("updateTopicsStats", () => {
  test("single lesson", () => {
    const updatedTopics = updateTopicsStats(lessonsStats0);
    expect(updatedTopics).toMatchObject({
      colors: {
        blue: 0,
        green: 1,
        gold: 0,
      },
    });
  });

  test("two topics, one incomplete", () => {
    const updatedTopics = updateTopicsStats(lessonsStats1);
    expect(updatedTopics).toMatchObject({
      colors: {
        blue: 1,
        green: 0,
        gold: 0,
      },
      animals: {
        blue: 5,
        green: 1,
        gold: 0,
      },
    });
  });

  test("four topics, one complete", () => {
    const updatedTopics = updateTopicsStats(lessonsStats2);
    expect(updatedTopics).toMatchObject({
      colors: {
        blue: 0,
        green: 0,
        gold: 1,
      },
      animals: {
        blue: 3,
        green: 2,
        gold: 1,
      },
      food: {
        blue: 3,
        green: 1,
        gold: 3,
      },
      habitation: {
        blue: 5,
        green: 1,
        gold: 0,
      },
    });
  });
});
