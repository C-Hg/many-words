import getWordScoreVariation from "./getWordScoreVariation.function";

import { MAX_WORD_SCORE_IN_LESSON } from "../../constants";

describe("getWordScoreVariation", () => {
  test("positive variation unaccounted for", () => {
    const scoreVariation = getWordScoreVariation(-2, -1);
    expect(scoreVariation).toEqual(0);
  });

  test("positive variation unaccounted for", () => {
    const scoreVariation = getWordScoreVariation(-0.5, -0);
    expect(scoreVariation).toEqual(0);
  });

  test("positive variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(0, 1);
    expect(scoreVariation).toEqual(1);
  });

  test("positive variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE_IN_LESSON - 2,
      MAX_WORD_SCORE_IN_LESSON
    );
    expect(scoreVariation).toEqual(2);
  });

  test("positive variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE_IN_LESSON - 2,
      MAX_WORD_SCORE_IN_LESSON - 1
    );
    expect(scoreVariation).toEqual(1);
  });

  test("positive variation unaccounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE_IN_LESSON,
      MAX_WORD_SCORE_IN_LESSON + 1
    );
    expect(scoreVariation).toEqual(0);
  });

  test("negative variation unaccounted for", () => {
    const scoreVariation = getWordScoreVariation(0, -1);
    expect(scoreVariation).toEqual(-0);
  });

  test("negative variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(0.5, 0);
    expect(scoreVariation).toEqual(-0.5);
  });

  test("negative variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE_IN_LESSON,
      MAX_WORD_SCORE_IN_LESSON - 2
    );
    expect(scoreVariation).toEqual(-2);
  });

  test("negative variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE_IN_LESSON - 1.5,
      MAX_WORD_SCORE_IN_LESSON - 2
    );
    expect(scoreVariation).toEqual(-0.5);
  });

  test("negative variation unaccounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE_IN_LESSON + 2,
      MAX_WORD_SCORE_IN_LESSON
    );
    expect(scoreVariation).toEqual(0);
  });
});
