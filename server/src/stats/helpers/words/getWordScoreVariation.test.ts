import getWordScoreVariation from "./getWordScoreVariation.function";

import { MAX_WORD_SCORE } from "../../constants";

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
      MAX_WORD_SCORE - 2,
      MAX_WORD_SCORE
    );
    expect(scoreVariation).toEqual(2);
  });

  test("positive variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE - 2,
      MAX_WORD_SCORE - 1
    );
    expect(scoreVariation).toEqual(1);
  });

  test("positive variation unaccounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE,
      MAX_WORD_SCORE + 1
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
      MAX_WORD_SCORE,
      MAX_WORD_SCORE - 2
    );
    expect(scoreVariation).toEqual(-2);
  });

  test("negative variation accounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE - 1.5,
      MAX_WORD_SCORE - 2
    );
    expect(scoreVariation).toEqual(-0.5);
  });

  test("negative variation unaccounted for", () => {
    const scoreVariation = getWordScoreVariation(
      MAX_WORD_SCORE + 2,
      MAX_WORD_SCORE
    );
    expect(scoreVariation).toEqual(0);
  });
});
