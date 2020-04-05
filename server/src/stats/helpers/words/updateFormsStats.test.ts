import FormResult from "../../interfaces/formResult.interface";
import FormStats, { Languages } from "../../interfaces/formStats.interface";
import updateFormsStats from "../updateFormsStats.function";

const formsStats0: FormStats[] = [
  {
    language: Languages.English,
    form: "uniqueForm",
    score: 1,
  },
  {
    language: Languages.French,
    form: "singularMasculine",
    score: 0,
  },
  {
    language: Languages.French,
    form: "pluralMasculine",
    score: 1,
  },
];
const FormResults0: FormResult = {
  language: Languages.English,
  form: "uniqueForm",
  englishName: "black",
  isAnswerCorrect: true,
};
const FormResults1: FormResult = {
  language: Languages.French,
  form: "pluralMasculine",
  englishName: "black",
  isAnswerCorrect: false,
};
const FormResults2: FormResult = {
  language: Languages.French,
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
        language: Languages.English,
        form: "uniqueForm",
        score: 2,
      },
      {
        language: Languages.French,
        form: "singularMasculine",
        score: 0,
      },
      {
        language: Languages.French,
        form: "pluralMasculine",
        score: 1,
      },
    ]);
  });

  test("should decrease score", () => {
    const updatedFormsStats = updateFormsStats(formsStats0, FormResults1);
    expect(updatedFormsStats).toEqual([
      {
        language: Languages.English,
        form: "uniqueForm",
        score: 1,
      },
      {
        language: Languages.French,
        form: "singularMasculine",
        score: 0,
      },
      {
        language: Languages.French,
        form: "pluralMasculine",
        score: 0.5,
      },
    ]);
  });

  test("should decrease score", () => {
    const updatedFormsStats = updateFormsStats(formsStats0, FormResults2);
    expect(updatedFormsStats).toEqual([
      {
        language: Languages.English,
        form: "uniqueForm",
        score: 1,
      },
      {
        language: Languages.French,
        form: "singularMasculine",
        score: -0.5,
      },
      {
        language: Languages.French,
        form: "pluralMasculine",
        score: 1,
      },
    ]);
  });
});
