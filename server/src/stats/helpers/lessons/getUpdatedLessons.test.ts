import getUpdatedLessons from "./getUpdatedLessons.function";

import wordCountByLesson from "../../../exercises/data/wordCountByLesson";
import { LessonCompletion } from "../../../exercises/types/curriculum.interface";
import { MAX_WORD_SCORE_IN_LESSON } from "../../constants";
import WordResult from "../../interfaces/wordResult.interface";

// mainColors lesson: 9 words total

const WordResults0: WordResult[] = [
  {
    wordStats: {
      userId: "55153a8014829a865bbf700d",
      englishName: "black",
      lesson: "mainColors",
      topic: "colors",
      correctAnswers: 1,
      wrongAnswers: 0,
      score: 1,
      formsStats: [],
    },
    scoreVariation: 1,
  },
  {
    wordStats: {
      userId: "55153a8014829a865bbf700d",
      englishName: "blue",
      lesson: "mainColors",
      topic: "colors",
      correctAnswers: 1,
      wrongAnswers: 0,
      score: 1,
      formsStats: [],
    },
    scoreVariation: 1,
  },
  {
    wordStats: {
      userId: "55153a8014829a865bbf700d",
      englishName: "pink",
      lesson: "mainColors",
      topic: "colors",
      correctAnswers: 0,
      wrongAnswers: 1,
      score: -0.5,
      formsStats: [],
    },
    scoreVariation: -0.5,
  },
  {
    wordStats: {
      userId: "55153a8014829a865bbf700d",
      englishName: "purple",
      lesson: "mainColors",
      topic: "colors",
      correctAnswers: 0,
      wrongAnswers: 1,
      score: -0.5,
      formsStats: [],
    },
    scoreVariation: -0.5,
  },
  {
    wordStats: {
      userId: "55153a8014829a865bbf700d",
      englishName: "green",
      lesson: "mainColors",
      topic: "colors",
      correctAnswers: 1,
      wrongAnswers: 0,
      score: 1,
      formsStats: [],
    },
    scoreVariation: 1,
  },
];

// const WordResults1: WordResult[] = [
//   {
//     wordStats: {
//       userId: "55153a8014829a865bbf700d",
//       englishName: "black",
//       lesson: "mainColors",
//       topic: "colors",
//       correctAnswers: 1,
//       wrongAnswers: 0,
//       score: 1,
//       formsStats: [],
//     },
//     scoreVariation: 1,
//   },
//   {
//     wordStats: {
//       userId: "55153a8014829a865bbf700d",
//       englishName: "cat",
//       lesson: "animalsBasics",
//       topic: "animals",
//       correctAnswers: 1,
//       wrongAnswers: 0,
//       score: 1,
//       formsStats: [],
//     },
//     scoreVariation: 1,
//   },
//   {
//     wordStats: {
//       userId: "55153a8014829a865bbf700d",
//       englishName: "dog",
//       lesson: "animalsBasics",
//       topic: "animals",
//       correctAnswers: 3,
//       wrongAnswers: 1,
//       score: 2.5,
//       formsStats: [],
//     },
//     scoreVariation: 1,
//   },
//   {
//     wordStats: {
//       userId: "55153a8014829a865bbf700d",
//       englishName: "ant",
//       lesson: "insects",
//       topic: "animals",
//       correctAnswers: 0,
//       wrongAnswers: 1,
//       score: -0.5,
//       formsStats: [],
//     },
//     scoreVariation: -0.5,
//   },
//   {
//     wordStats: {
//       userId: "55153a8014829a865bbf700d",
//       englishName: "bird",
//       lesson: "birds",
//       topic: "animals",
//       correctAnswers: 1,
//       wrongAnswers: 0,
//       score: 1,
//       formsStats: [],
//     },
//     scoreVariation: 1,
//   },
// ];

const lessons0: LessonCompletion[] = [];

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

describe("getUpdatedLessons", () => {
  test("first lesson", () => {
    const updatedLessonsStats = getUpdatedLessons(WordResults0, lessons0);
    expect(updatedLessonsStats).toEqual([
      {
        completion:
          2 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.mainColors),
        name: "mainColors",
      },
    ]);
  });

  test("update single lesson in topic", () => {
    const updatedLessonsStats = getUpdatedLessons(WordResults0, lessons1);
    // testing object entries separately because order is not guaranteed
    expect(updatedLessonsStats).toEqual([
      {
        name: "mainColors",
        completion:
          2 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.mainColors) + 0.4,
      },
      // this should not be modified
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
    ]);
  });

  // TODO: weak words @V2
  // test("update several lessons in 2 topics", () => {
  //   const updatedLessonsStats = getUpdatedLessons(WordResults1, lessons1);
  //   expect(updatedLessonsStats).toEqual({
  //     mainColors:
  //       1 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.mainColors) + 0.4,
  //     animalsBasics:
  //       2 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.animalsBasics) + 0.6,
  //     insects:
  //       -0.5 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.insects) + 0.1,
  //     birds: 1 / (MAX_WORD_SCORE_IN_LESSON * wordCountByLesson.birds) + 0.2,
  //   });
  // });
});
