import getLessonScoreVariation from "./getLessonScoreVariation.function";

import WordResult from "../../interfaces/wordResult.interface";

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

const WordResults1: WordResult[] = [
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
      englishName: "cat",
      lesson: "animalsBasics",
      topic: "animals",
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
      englishName: "dog",
      lesson: "animalsBasics",
      topic: "animals",
      correctAnswers: 3,
      wrongAnswers: 1,
      score: 2.5,
      formsStats: [],
    },
    scoreVariation: 1,
  },
  {
    wordStats: {
      userId: "55153a8014829a865bbf700d",
      englishName: "ant",
      lesson: "insects",
      topic: "animals",
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
      englishName: "bird",
      lesson: "birds",
      topic: "animals",
      correctAnswers: 1,
      wrongAnswers: 0,
      score: 1,
      formsStats: [],
    },
    scoreVariation: 1,
  },
];

describe("getLessonScoreVariation", () => {
  test("same lesson", () => {
    const ts = getLessonScoreVariation(WordResults0);
    expect(ts).toEqual(2);
  });

  // TODO: @V2 weak words
  // test("different lessons and topics", () => {
  //   const ts = getLessonScoreVariation(WordResults1)
  //   expect(ts).toEqual[
  //     {
  //       lesson: "mainColors",
  //       scoreVariation: 1,
  //     },
  //     {
  //       lesson: "animalsBasics",
  //       scoreVariation: 2,
  //     },
  //     {
  //       lesson: "insects",
  //       scoreVariation: -0.5,
  //     },
  //     {
  //       lesson: "birds",
  //       scoreVariation: 1,
  //     },
  //   ]);
  // });
});
