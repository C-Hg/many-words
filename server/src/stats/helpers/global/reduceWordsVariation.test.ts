import { ObjectID } from "mongodb";

import reduceWordsVariation from "./reduceWordsVariation.function";

import WordResult from "../../interfaces/wordResult.interface";
import { WordStats } from "../../interfaces/wordStats.interface";

const wordStatsMock: WordStats = {
  userId: new ObjectID("55153a8014829a865bbf700d"),
  englishName: "cat",
  lesson: "animalsBasics",
  topic: "animals",
  correctAnswers: 1,
  wrongAnswers: 0,
  globalScore: 1,
  formsStats: [],
};

const wordResults0: WordResult[] = [
  // 5 new words
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
];

const wordResults1: WordResult[] = [
  // 3 new words
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  // 2 more green
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: 1,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: 1,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  // 1 less green
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    globalScoreVariation: 1,
  },
  // 1 less gold, +1 green
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: +1,
    goldCount: -1,
    globalScoreVariation: -0.5,
  },
];

const wordResults2: WordResult[] = [
  // 3 green less
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    globalScoreVariation: -0.5,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    globalScoreVariation: -0.5,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    globalScoreVariation: -0.5,
  },
  // 2 more gold
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 1,
    globalScoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 1,
    globalScoreVariation: 1,
  },
];

describe("reduceWordsVariation", () => {
  test("first lesson", () => {
    const wordsVariations = reduceWordsVariation(wordResults0);
    expect(wordsVariations).toMatchObject({
      studiedWordsVariation: 5,
      greenWordsVariation: 0,
      goldWordsVariation: 0,
    });
  });

  test("new lesson", () => {
    const wordsVariations = reduceWordsVariation(wordResults1);
    expect(wordsVariations).toMatchObject({
      studiedWordsVariation: 3,
      greenWordsVariation: 2,
      goldWordsVariation: -1,
    });
  });

  test("another new lesson", () => {
    const wordsVariations = reduceWordsVariation(wordResults2);
    expect(wordsVariations).toMatchObject({
      studiedWordsVariation: 0,
      greenWordsVariation: -5,
      goldWordsVariation: 2,
    });
  });
});
