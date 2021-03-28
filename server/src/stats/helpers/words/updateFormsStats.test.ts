import updateFormsStats from "./updateFormsStats.function";

import { ExerciseResultInput as FormResult } from "../../../graphql/types";
import FormStats from "../../interfaces/formStats.interface";

const formsStats0: FormStats[] = [
  {
    language: "english",
    form: "uniqueForm",
    score: 1,
  },
  {
    language: "french",
    form: "singularMasculine",
    score: 0,
  },
  {
    language: "french",
    form: "pluralMasculine",
    score: 1,
  },
];
const FormResults0: FormResult = {
  language: "english",
  form: "uniqueForm",
  englishName: "black",
  isAnswerCorrect: true,
};
const FormResults1: FormResult = {
  language: "french",
  form: "pluralMasculine",
  englishName: "black",
  isAnswerCorrect: false,
};
const FormResults2: FormResult = {
  language: "french",
  form: "singularMasculine",
  englishName: "black",
  isAnswerCorrect: false,
};

describe("updateFormsStats", () => {
  test("should increase score", () => {
    const updatedFormsStats = updateFormsStats(formsStats0, FormResults0);
    expect(updatedFormsStats).toHaveLength(3);
    expect(updatedFormsStats).toEqual([
      {
        language: "english",
        form: "uniqueForm",
        score: 2,
      },
      {
        language: "french",
        form: "singularMasculine",
        score: 0,
      },
      {
        language: "french",
        form: "pluralMasculine",
        score: 1,
      },
    ]);
  });

  test("should decrease score", () => {
    const updatedFormsStats = updateFormsStats(formsStats0, FormResults1);
    expect(updatedFormsStats).toEqual([
      {
        language: "english",
        form: "uniqueForm",
        score: 1,
      },
      {
        language: "french",
        form: "singularMasculine",
        score: 0,
      },
      {
        language: "french",
        form: "pluralMasculine",
        score: 0.5,
      },
    ]);
  });

  test("should decrease score", () => {
    const updatedFormsStats = updateFormsStats(formsStats0, FormResults2);
    expect(updatedFormsStats).toEqual([
      {
        language: "english",
        form: "uniqueForm",
        score: 1,
      },
      {
        language: "french",
        form: "singularMasculine",
        score: -0.5,
      },
      {
        language: "french",
        form: "pluralMasculine",
        score: 1,
      },
    ]);
  });
});
