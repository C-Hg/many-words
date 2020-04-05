/* eslint-disable @typescript-eslint/camelcase */
import { ObjectID } from "mongodb";

import wordCountByLesson from "../../../exercises/data/wordCountByLesson";
import { LESSON_SCORE_PRECISION, MAX_WORD_SCORE } from "../../constants";
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

const user1 = {
  _id: new ObjectID("55153a8014829a865bbf700d"),
  email: "myemail",
  googleId: "18613",
  stats: {
    lessons: {
      colors: {
        main_colors: 0.4,
      },
      animals: {
        animals_basics: 0.6,
        insects: 0.1,
        birds: 0.2,
      },
    },
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
    expect(updatedLessonsStats).toEqual({
      colors: {
        main_colors: (
          2 /
          (MAX_WORD_SCORE * wordCountByLesson.main_colors)
        ).toFixed(LESSON_SCORE_PRECISION),
      },
    });
  });

  test("update single lesson in topic", () => {
    const updatedLessonsStats = updateLessonsStats(WordResults0, user1);
    // testing object entries separately because order is not guaranteed
    expect(updatedLessonsStats).toEqual({
      colors: {
        main_colors: (
          2 / (MAX_WORD_SCORE * wordCountByLesson.main_colors) +
          0.4
        ).toFixed(LESSON_SCORE_PRECISION),
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
    const updatedLessonsStats = updateLessonsStats(WordResults1, user1);
    expect(updatedLessonsStats).toEqual({
      colors: {
        main_colors: (
          1 / (MAX_WORD_SCORE * wordCountByLesson.main_colors) +
          0.4
        ).toFixed(LESSON_SCORE_PRECISION),
      },
      animals: {
        animals_basics: (
          2 / (MAX_WORD_SCORE * wordCountByLesson.animals_basics) +
          0.6
        ).toFixed(LESSON_SCORE_PRECISION),
        insects: (
          -0.5 / (MAX_WORD_SCORE * wordCountByLesson.insects) +
          0.1
        ).toFixed(LESSON_SCORE_PRECISION),
        birds: (1 / (MAX_WORD_SCORE * wordCountByLesson.birds) + 0.2).toFixed(
          LESSON_SCORE_PRECISION
        ),
      },
    });
  });
});
