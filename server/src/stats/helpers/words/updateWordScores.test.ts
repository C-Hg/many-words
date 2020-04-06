import updateWordScores from "./updateWordScores.function";

describe("updateWordScores", () => {
  test("first correct answer", () => {
    const WordScores = updateWordScores(0, 0, 0, true);
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 1,
      updatedWrongAnswers: 0,
      updatedGlobalScore: 1,
      greenCount: 0,
      goldCount: 0,
    });
  });

  test("first wrong answer", () => {
    const WordScores = updateWordScores(0, 0, 0, false);
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 0,
      updatedWrongAnswers: 1,
      updatedGlobalScore: -0.5,
      greenCount: 0,
      goldCount: 0,
    });
  });

  test("now green word", () => {
    const globalScore = 1.5;
    const correctAnswers = 2;
    const wrongAnswers = 1;
    const WordScores = updateWordScores(
      globalScore,
      correctAnswers,
      wrongAnswers,
      true
    );
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 3,
      updatedWrongAnswers: 1,
      updatedGlobalScore: 2.5,
      greenCount: 1,
      goldCount: 0,
    });
  });

  test("not green any more", () => {
    const correctAnswers = 2;
    const wrongAnswers = 0;
    const globalScore = 2;
    const WordScores = updateWordScores(
      globalScore,
      correctAnswers,
      wrongAnswers,
      false
    );
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 2,
      updatedWrongAnswers: 1,
      updatedGlobalScore: 1.5,
      greenCount: -1,
      goldCount: 0,
    });
  });

  test("now gold word", () => {
    const correctAnswers = 4;
    const wrongAnswers = 2;
    const globalScore = 3;
    const WordScores = updateWordScores(
      globalScore,
      correctAnswers,
      wrongAnswers,
      true
    );
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 5,
      updatedWrongAnswers: 2,
      updatedGlobalScore: 4,
      greenCount: -1,
      goldCount: 1,
    });
  });

  test("not gold any more", () => {
    const correctAnswers = 5;
    const wrongAnswers = 2;
    const globalScore = 4;
    const WordScores = updateWordScores(
      globalScore,
      correctAnswers,
      wrongAnswers,
      false
    );
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 5,
      updatedWrongAnswers: 3,
      updatedGlobalScore: 3.5,
      greenCount: 1,
      goldCount: -1,
    });
  });

  test("above gold", () => {
    const correctAnswers = 7;
    const wrongAnswers = 0;
    const globalScore = 7;
    const WordScores = updateWordScores(
      globalScore,
      correctAnswers,
      wrongAnswers,
      true
    );
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 8,
      updatedWrongAnswers: 0,
      updatedGlobalScore: 8,
      greenCount: 0,
      goldCount: 0,
    });
  });

  test("above gold", () => {
    const correctAnswers = 7;
    const wrongAnswers = 0;
    const globalScore = 7;
    const WordScores = updateWordScores(
      globalScore,
      correctAnswers,
      wrongAnswers,
      false
    );
    expect(WordScores).toEqual({
      updatedCorrectAnswers: 7,
      updatedWrongAnswers: 1,
      updatedGlobalScore: 6.5,
      greenCount: 0,
      goldCount: 0,
    });
  });
});
