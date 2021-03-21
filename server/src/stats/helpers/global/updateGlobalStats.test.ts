import updateGlobalStats from "./updateGlobalStats.function";

import globalStats from "../../../exercises/data/globalStats";
import { LessonCompletion } from "../../../exercises/types/curriculum.interface";
import { CurriculumStats } from "../../../graphql/types";
import {
  GOLD_WORD_SCORE,
  MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS,
  GREEN_WORD_SCORE,
} from "../../constants";
import WordResult from "../../interfaces/wordResult.interface";
import { WordStats } from "../../interfaces/wordStats.interface";

const wordStatsMock: WordStats = {
  userId: "55153a8014829a865bbf700d",
  englishName: "cat",
  lesson: "animalsBasics",
  topic: "animals",
  correctAnswers: 1,
  wrongAnswers: 0,
  score: 1,
  formsStats: [],
};

// 0: first lesson
const wordResults0: WordResult[] = [
  // 5 new words
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
];

const lessonsStats0: LessonCompletion[] = [
  {
    name: "mainColors",
    completion: 0.1666,
  },
];

const globalStats0: CurriculumStats = {
  studiedLessons: 0,
  greenLessons: 0,
  goldLessons: 0,
  studiedWords: 0,
  greenWords: 0,
  goldWords: 0,
  globalProgress: 0,
};

const wordResults1: WordResult[] = [
  // 3 new words
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: true,
    greenCount: 0,
    goldCount: 0,
    scoreVariation: 1,
  },
  // 2 more green
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: 1,
    goldCount: 0,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: 1,
    goldCount: 0,
    scoreVariation: 1,
  },
  // 1 less green
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    scoreVariation: 1,
  },
  // 1 less gold, +1 green
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: +1,
    goldCount: -1,
    scoreVariation: -0.5,
  },
];

const lessonsStats1: LessonCompletion[] = [
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
];

const globalStats1: CurriculumStats = {
  studiedLessons: 3,
  greenLessons: 1,
  goldLessons: 1,
  studiedWords: 56,
  greenWords: 15,
  goldWords: 2,
  globalProgress: 0.2,
};

const wordResults2: WordResult[] = [
  // 3 green less
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    scoreVariation: -0.5,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    scoreVariation: -0.5,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 0,
    scoreVariation: -0.5,
  },
  // 2 more gold
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 1,
    scoreVariation: 1,
  },
  {
    wordStats: wordStatsMock,
    isNew: false,
    greenCount: -1,
    goldCount: 1,
    scoreVariation: 1,
  },
];

const lessonsStats2: LessonCompletion[] = [
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
];

const globalStats2: CurriculumStats = {
  studiedLessons: 3,
  greenLessons: 1,
  goldLessons: 1,
  studiedWords: 56,
  greenWords: 22,
  goldWords: 15,
  globalProgress: 0.2,
};

describe("updateGlobalStats", () => {
  test("first lesson", () => {
    const updatedGlobalStats = updateGlobalStats(
      wordResults0,
      lessonsStats0,
      globalStats0
    );
    expect(updatedGlobalStats).toMatchObject({
      studiedLessons: 1,
      greenLessons: 0,
      goldLessons: 0,
      studiedWords: 5,
      greenWords: 0,
      goldWords: 0,
      globalProgress:
        5 / (globalStats.wordsCount * MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS),
    });
  });

  test("new lesson with previous stats", () => {
    const updatedGlobalStats = updateGlobalStats(
      wordResults0,
      lessonsStats1,
      globalStats1
    );
    expect(updatedGlobalStats).toMatchObject({
      studiedLessons: 4,
      greenLessons: 1,
      goldLessons: 1,
      studiedWords: 61,
      greenWords: 15,
      goldWords: 2,
      globalProgress:
        (61 + GREEN_WORD_SCORE * 15 + GOLD_WORD_SCORE * 2) /
        (globalStats.wordsCount * MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS),
    });
  });

  test("known lesson", () => {
    const updatedGlobalStats = updateGlobalStats(
      wordResults1,
      lessonsStats1,
      globalStats1
    );
    expect(updatedGlobalStats).toMatchObject({
      studiedLessons: 4,
      greenLessons: 1,
      goldLessons: 1,
      studiedWords: 59,
      greenWords: 17,
      goldWords: 1,
      globalProgress:
        (59 + GREEN_WORD_SCORE * 17 + GOLD_WORD_SCORE * 1) /
        (globalStats.wordsCount * MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS),
    });
  });

  test("known lesson 2", () => {
    const updatedGlobalStats = updateGlobalStats(
      wordResults2,
      lessonsStats2,
      globalStats2
    );
    expect(updatedGlobalStats).toMatchObject({
      studiedLessons: 8,
      greenLessons: 2,
      goldLessons: 2,
      studiedWords: 56,
      greenWords: 17,
      goldWords: 17,
      globalProgress:
        (56 + GREEN_WORD_SCORE * 17 + GOLD_WORD_SCORE * 17) /
        (globalStats.wordsCount * MAX_WORD_SCORE_FOR_GLOBAL_PROGRESS),
    });
  });
});
