import { Types } from "mongoose";

import appendWeakestForms from "./appendWeakestForms.function";

import { Word } from "../../graphql/learn.types";
import { LANGUAGES } from "../../stats/constants";
import { WordStats } from "../../stats/interfaces/wordStats.interface";
import WordStatsModel from "../../stats/models/wordStats.model";
import WordModel from "../models/word.model";

const words: Word[] = [
  new WordModel({
    english: {
      name: "black",
    },
    french: {
      name: "noir",
    },
    hasUniqueForm: false,
    lesson: "mainColors",
    topic: "colors",
  }),
  new WordModel({
    english: {
      name: "red",
      words: [],
    },
    french: {
      name: "rouge",
      words: [],
    },
    hasUniqueForm: false,
    lesson: "mainColors",
    topic: "colors",
  }),
];

describe("appendWeakestForms", () => {
  test("should append a void array", () => {
    const words0: Word[] = [
      new WordModel({
        english: {
          name: "black",
        },
        french: {
          name: "noir",
        },
        hasUniqueForm: false,
        lesson: "mainColors",
        topic: "colors",
        type: "adjective",
      }),
    ];
    const wordStats0 = [null];
    const wordsWithWeakForms = appendWeakestForms(words0, wordStats0);
    expect(wordsWithWeakForms).toHaveLength(1);
    // checking that all properties are present only once
    expect(wordsWithWeakForms[0]).toHaveProperty("_id");
    expect(wordsWithWeakForms[0].english.name).toBe("black");
    expect(wordsWithWeakForms[0].french.name).toEqual("noir");
    expect(wordsWithWeakForms[0].hasUniqueForm).toEqual(false);
    expect(wordsWithWeakForms[0].type).toEqual("adjective");
    expect(wordsWithWeakForms[0].lesson).toEqual("mainColors");
    expect(wordsWithWeakForms[0].topic).toEqual("colors");
    expect(wordsWithWeakForms[0].weakestForms).toEqual([]);
  });

  test("should select the weakest form for each word", () => {
    const wordStats1: WordStats[] = [
      new WordStatsModel({
        englishName: "black",
        formsStats: [
          { language: "english", form: "uniqueForm", score: 1 },
          { language: LANGUAGES.French, form: "singularMasculine", score: 0 },
          {
            language: LANGUAGES.French,
            form: "pluralMasculine",
            score: -0.5,
          },
          { language: LANGUAGES.French, form: "singularFeminine", score: 1 },
          { language: LANGUAGES.French, form: "pluralFeminine", score: 1 },
        ],
        lesson: "mainColors",
        topic: "colors",
      }),
      new WordStatsModel({
        englishName: "red",
        formsStats: [
          { language: LANGUAGES.English, form: "uniqueForm", score: 2 },
          { language: LANGUAGES.French, form: "singularMasculine", score: 2 },
          { language: LANGUAGES.French, form: "pluralMasculine", score: 2 },
          { language: LANGUAGES.French, form: "singularFeminine", score: 1 },
          { language: LANGUAGES.French, form: "pluralFeminine", score: 2 },
        ],
        lesson: "mainColors",
        topic: "colors",
      }),
    ];
    const wordsWithWeakForms = appendWeakestForms(words, wordStats1);
    expect(wordsWithWeakForms).toHaveLength(2);
    expect(wordsWithWeakForms[0].weakestForms).toMatchObject([
      {
        language: "french",
        form: "pluralMasculine",
        score: -0.5,
      },
    ]);
    expect(wordsWithWeakForms[1].weakestForms).toMatchObject([
      {
        language: LANGUAGES.French,
        form: "singularFeminine",
        score: 1,
      },
    ]);
  });

  test("should select several equally weak forms for each word", function () {
    const wordStats2 = [
      new WordStatsModel({
        englishName: "black",
        formsStats: [
          { language: LANGUAGES.English, form: "uniqueForm", score: -1 },
          { language: LANGUAGES.French, form: "singularMasculine", score: 2 },
          { language: LANGUAGES.French, form: "pluralMasculine", score: 2 },
          { language: LANGUAGES.French, form: "singularFeminine", score: -1 },
          { language: LANGUAGES.French, form: "pluralFeminine", score: -1 },
        ],
      }),
      new WordStatsModel({
        userId: Types.ObjectId("5d594f138d651a002b6fd29c"),
        englishName: "red",
        formsStats: [
          { language: LANGUAGES.English, form: "uniqueForm", score: 2 },
          { language: LANGUAGES.French, form: "singularMasculine", score: 0 },
          { language: LANGUAGES.French, form: "pluralMasculine", score: 0 },
          { language: LANGUAGES.French, form: "singularFeminine", score: 1 },
          { language: LANGUAGES.French, form: "pluralFeminine", score: 2 },
        ],
        lesson: "mainColors",
        topic: "colors",
      }),
    ];
    const wordsWithWeakForms = appendWeakestForms(words, wordStats2);
    expect(wordsWithWeakForms[0].weakestForms).toMatchObject([
      { language: LANGUAGES.English, form: "uniqueForm", score: -1 },
      { language: LANGUAGES.French, form: "singularFeminine", score: -1 },
      { language: LANGUAGES.French, form: "pluralFeminine", score: -1 },
    ]);
    expect(wordsWithWeakForms[1].weakestForms).toMatchObject([
      { language: LANGUAGES.French, form: "singularMasculine", score: 0 },
      { language: LANGUAGES.French, form: "pluralMasculine", score: 0 },
    ]);
  });

  test("should produce an empty array if no wordStats are provided", function () {
    const words3: Word[] = [
      new WordModel({
        english: {
          name: "black",
        },
        french: {
          name: "noir",
        },
        hasUniqueForm: false,
        lesson: "mainColors",
        topic: "colors",
      }),
      new WordModel({
        english: {
          name: "blue",
        },
        french: {
          name: "bleu",
        },
        hasUniqueForm: false,
        lesson: "mainColors",
        topic: "colors",
      }),
      new WordModel({
        english: {
          name: "red",
        },
        french: {
          name: "rouge",
        },
        hasUniqueForm: false,
        lesson: "mainColors",
        topic: "colors",
      }),
    ];
    const wordStats3 = [
      null,
      new WordStatsModel({
        formsStats: [
          { language: LANGUAGES.English, form: "uniqueForm", score: 1 },
          { language: LANGUAGES.French, form: "singularMasculine", score: 2 },
          { language: LANGUAGES.French, form: "pluralMasculine", score: 2 },
          { language: LANGUAGES.French, form: "singularFeminine", score: 1 },
          { language: LANGUAGES.French, form: "pluralFeminine", score: 1 },
        ],
      }),
      null,
    ];
    const wordsWithWeakForms = appendWeakestForms(words3, wordStats3);
    expect(wordsWithWeakForms).toHaveLength(3);
    expect(wordsWithWeakForms[0].weakestForms).toEqual([]);
    expect(wordsWithWeakForms[1].weakestForms).toMatchObject([
      { language: LANGUAGES.English, form: "uniqueForm", score: 1 },
      {
        language: LANGUAGES.French,
        form: "singularFeminine",
        score: 1,
      },
      { language: LANGUAGES.French, form: "pluralFeminine", score: 1 },
    ]);
    expect(wordsWithWeakForms[2].weakestForms).toEqual([]);
  });
});
