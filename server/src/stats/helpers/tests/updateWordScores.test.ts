import updateWordScores from "../updateWordScores.function";

const wordStats0 = {
  correctAnswers: 0,
  wrongAnswers: 0,
  globalScore: 0,
};

const wordStats5 = {
  correctAnswers: 7,
  wrongAnswers: 0,
  globalScore: 7,
};

describe("updateWordScores", () => {
  test("first correct answer", () => {
    const wordResults = updateWordScores(wordStats0, true);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 1,
      updatedWrongAnswers: 0,
      updatedGlobalScore: 1,
      greenCount: 0,
      goldCount: 0,
    });
  });

  test("first wrong answer", () => {
    const wordResults = updateWordScores(wordStats0, false);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 0,
      updatedWrongAnswers: 1,
      updatedGlobalScore: -0.5,
      greenCount: 0,
      goldCount: 0,
    });
  });

  test("now green word", () => {
    const wordStats1 = {
      correctAnswers: 2,
      wrongAnswers: 1,
      globalScore: 1.5,
    };
    const wordResults = updateWordScores(wordStats1, true);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 3,
      updatedWrongAnswers: 1,
      updatedGlobalScore: 2.5,
      greenCount: 1,
      goldCount: 0,
    });
  });

  test("not green any more", () => {
    const wordStats2 = {
      correctAnswers: 2,
      wrongAnswers: 0,
      globalScore: 2,
    };
    const wordResults = updateWordScores(wordStats2, false);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 2,
      updatedWrongAnswers: 1,
      updatedGlobalScore: 1.5,
      greenCount: -1,
      goldCount: 0,
    });
  });

  test("now gold word", () => {
    const wordStats3 = {
      correctAnswers: 4,
      wrongAnswers: 2,
      globalScore: 3,
    };
    const wordResults = updateWordScores(wordStats3, true);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 5,
      updatedWrongAnswers: 2,
      updatedGlobalScore: 4,
      greenCount: -1,
      goldCount: 1,
    });
  });

  test("not gold any more", () => {
    const wordStats4 = {
      correctAnswers: 5,
      wrongAnswers: 2,
      globalScore: 4,
    };
    const wordResults = updateWordScores(wordStats4, false);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 5,
      updatedWrongAnswers: 3,
      updatedGlobalScore: 3.5,
      greenCount: 1,
      goldCount: -1,
    });
  });

  test("above gold", () => {
    const wordResults = updateWordScores(wordStats5, true);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 8,
      updatedWrongAnswers: 0,
      updatedGlobalScore: 8,
      greenCount: 0,
      goldCount: 0,
    });
  });

  test("above gold", () => {
    const wordResults = updateWordScores(wordStats5, false);
    expect(wordResults).toEqual({
      updatedCorrectAnswers: 7,
      updatedWrongAnswers: 1,
      updatedGlobalScore: 6.5,
      greenCount: 0,
      goldCount: 0,
    });
  });
});
