import { ObjectID } from "mongodb";

import getNewLessonsStats from "./getNewLessonsStats.function";

import WordResult from "../../interfaces/wordResult.interface";

const WordResults0: WordResult[] = [
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "black",
      lesson: "mainColors",
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
      lesson: "mainColors",
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
      lesson: "mainColors",
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
      lesson: "mainColors",
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
      lesson: "mainColors",
      topic: "colors",
      correctAnswers: 1,
      wrongAnswers: 0,
      globalScore: 1,
      formsStats: [],
    },
    globalScoreVariation: 1,
  },
];

const WordResults1: WordResult[] = [
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "black",
      lesson: "mainColors",
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
      englishName: "cat",
      lesson: "animalsBasics",
      topic: "animals",
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
      englishName: "dog",
      lesson: "animalsBasics",
      topic: "animals",
      correctAnswers: 3,
      wrongAnswers: 1,
      globalScore: 2.5,
      formsStats: [],
    },
    globalScoreVariation: 1,
  },
  {
    wordStats: {
      userId: new ObjectID("55153a8014829a865bbf700d"),
      englishName: "ant",
      lesson: "insects",
      topic: "animals",
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
      englishName: "bird",
      lesson: "birds",
      topic: "animals",
      correctAnswers: 1,
      wrongAnswers: 0,
      globalScore: 1,
      formsStats: [],
    },
    globalScoreVariation: 1,
  },
];

describe("getNewLessonsStats", () => {
  test("same lesson", () => {
    const newLessonsStats = getNewLessonsStats(WordResults0);
    expect(newLessonsStats).toEqual([
      {
        topic: "colors",
        lesson: "mainColors",
        scoreVariation: 2,
      },
    ]);
  });

  test("different lessons and topics", () => {
    const newLessonsStats = getNewLessonsStats(WordResults1);
    expect(newLessonsStats).toEqual([
      {
        topic: "colors",
        lesson: "mainColors",
        scoreVariation: 1,
      },
      {
        topic: "animals",
        lesson: "animalsBasics",
        scoreVariation: 2,
      },
      {
        topic: "animals",
        lesson: "insects",
        scoreVariation: -0.5,
      },
      {
        topic: "animals",
        lesson: "birds",
        scoreVariation: 1,
      },
    ]);
  });
});
