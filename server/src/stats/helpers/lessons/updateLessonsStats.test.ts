/* eslint-disable @typescript-eslint/camelcase */
import { ObjectID } from "mongodb";

import updateLessonsStats from "./updateLessonsStats.function";

import wordCountByLesson from "../../../exercises/data/wordCountByLesson";
import {
  LESSON_SCORE_PRECISION,
  MAX_WORD_SCORE_IN_LESSON,
} from "../../constants";
import WordResult from "../../interfaces/wordResult.interface";

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

const WordResults1: WordResult[] = [
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
      englishName: "cat",
      lesson: "animals_basics",
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
      lesson: "animals_basics",
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

const lessonStats0 = {};

const lessonStats1 = {
  colors: {
    main_colors: 0.4,
  },
  animals: {
    animals_basics: 0.6,
    insects: 0.1,
    birds: 0.2,
  },
};

describe("updateLessonsStats", () => {
  test("first lesson", () => {
    const updatedLessonsStats = updateLessonsStats(WordResults0, lessonStats0);
    expect(updatedLessonsStats).toEqual({
      colors: {
        main_colors:
          2 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.main_colors),
      },
    });
  });

  test("update single lesson in topic", () => {
    const updatedLessonsStats = updateLessonsStats(WordResults0, lessonStats1);
    // testing object entries separately because order is not guaranteed
    expect(updatedLessonsStats).toEqual({
      colors: {
        main_colors:
          2 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.main_colors) + 0.4,
      },
      animals: {
        // this should not be modified
        animals_basics: 0.6,
        insects: 0.1,
        birds: 0.2,
      },
    });
  });

  test("update several lessons in 2 topics", () => {
    const updatedLessonsStats = updateLessonsStats(WordResults1, lessonStats1);
    expect(updatedLessonsStats).toEqual({
      colors: {
        main_colors:
          1 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.main_colors) + 0.4,
      },
      animals: {
        animals_basics:
          2 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.animals_basics) +
          0.6,
        insects:
          -0.5 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.insects) + 0.1,
        birds: 1 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.birds) + 0.2,
      },
    });
  });
});
