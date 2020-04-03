/* eslint-disable @typescript-eslint/camelcase */
import { ObjectID } from "mongodb";

import { Languages } from "../../interfaces/formStats.interface";
import WordResult from "../../interfaces/wordResult.interface";
import updateLessonsStats from "../updateLessonsStats.function";

// main_colors lesson: 9 words total

const WordResults0: WordResult[] = [
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "black",
      lesson: "main_colors",
      topic: "colors",
      correctAnswers: 1,
      wrongAnswers: 0,
      globalScore: 1,
      formsStats: [],
    },
    globalScoreVariation: 1,
  },
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "blue",
      lesson: "main_colors",
      topic: "colors",
      correctAnswers: 1,
      wrongAnswers: 0,
      globalScore: 1,
      formsStats: [],
    },
    globalScoreVariation: 1,
  },
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "pink",
      lesson: "main_colors",
      topic: "colors",
      correctAnswers: 0,
      wrongAnswers: 1,
      globalScore: -0.5,
      formsStats: [],
    },
    globalScoreVariation: -0.5,
  },
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "purple",
      lesson: "main_colors",
      topic: "colors",
      correctAnswers: 0,
      wrongAnswers: 1,
      globalScore: -0.5,
      formsStats: [],
    },
    globalScoreVariation: -0.5,
  },
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "green",
      lesson: "main_colors",
      topic: "colors",
      correctAnswers: 1,
      wrongAnswers: 0,
      globalScore: 1,
      formsStats: [],
    },
    globalScoreVariation: 1,
  },
];

const user0 = {
  _id: new ObjectID("55153a8014829a865bbf700d"),
  email: "myemail",
  googleId: "18613",
  stats: {
    lessons: {},
    topics: {},
    globalProgress: {
      studiedLessons: 0,
      greenLessons: 0,
      goldLessons: 0,
      encounteredWords: 0,
      greenWords: 0,
      goldWords: 0,
    },
  },
};

describe("updateLessonsStats", () => {
  test("first lesson", () => {
    const updatedLessonsStats = updateLessonsStats(WordResults0, user0);
    expect(updateLessonsStats).toEqual({
      colors: {
        main_colors: 2,
      },
    });
  });
});
