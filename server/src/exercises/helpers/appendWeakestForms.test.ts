import appendWeakestForms from "./appendWeakestForms.function";
import WordStats from "../../user/stats/interfaces/wordStats.interface";
import { Languages } from "../../user/stats/interfaces/formStats.interface";
import { Types } from "mongoose";
import WordStatsModel from "../../user/stats/models/wordStats.model";
import Word from "../interfaces/word.interface";
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
    lesson: "main_colors",
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
    lesson: "main_colors",
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
        lesson: "main_colors",
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
    expect(wordsWithWeakForms[0].lesson).toEqual("main_colors");
    expect(wordsWithWeakForms[0].topic).toEqual("colors");
    expect(wordsWithWeakForms[0].weakestForms).toEqual([]);
  });

  test("should select the weakest form for each word", () => {
    const wordStats1: WordStats[] = [
      new WordStatsModel({
        englishName: "black",
        statsByForm: [
          { language: "english", form: "uniqueForm", score: 1 },
          { language: Languages.French, form: "singularMasculine", score: 0 },
          {
            language: Languages.French,
            form: "pluralMasculine",
            score: -0.5,
          },
          { language: Languages.French, form: "singularFeminine", score: 1 },
          { language: Languages.French, form: "pluralFeminine", score: 1 },
        ],
        lesson: "main_colors",
        topic: "colors",
      }),
      new WordStatsModel({
        englishName: "red",
        statsByForm: [
          { language: Languages.English, form: "uniqueForm", score: 2 },
          { language: Languages.French, form: "singularMasculine", score: 2 },
          { language: Languages.French, form: "pluralMasculine", score: 2 },
          { language: Languages.French, form: "singularFeminine", score: 1 },
          { language: Languages.French, form: "pluralFeminine", score: 2 },
        ],
        lesson: "main_colors",
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
        language: Languages.French,
        form: "singularFeminine",
        score: 1,
      },
    ]);
  });

  test("should select several equally weak forms for each word", function() {
    const wordStats2 = [
      new WordStatsModel({
        englishName: "black",
        statsByForm: [
          { language: Languages.English, form: "uniqueForm", score: -1 },
          { language: Languages.French, form: "singularMasculine", score: 2 },
          { language: Languages.French, form: "pluralMasculine", score: 2 },
          { language: Languages.French, form: "singularFeminine", score: -1 },
          { language: Languages.French, form: "pluralFeminine", score: -1 },
        ],
      }),
      new WordStatsModel({
        userId: Types.ObjectId("5d594f138d651a002b6fd29c"),
        englishName: "red",
        statsByForm: [
          { language: Languages.English, form: "uniqueForm", score: 2 },
          { language: Languages.French, form: "singularMasculine", score: 0 },
          { language: Languages.French, form: "pluralMasculine", score: 0 },
          { language: Languages.French, form: "singularFeminine", score: 1 },
          { language: Languages.French, form: "pluralFeminine", score: 2 },
        ],
        lesson: "main_colors",
        topic: "colors",
      }),
    ];
    const wordsWithWeakForms = appendWeakestForms(words, wordStats2);
    expect(wordsWithWeakForms[0].weakestForms).toMatchObject([
      { language: Languages.English, form: "uniqueForm", score: -1 },
      { language: Languages.French, form: "singularFeminine", score: -1 },
      { language: Languages.French, form: "pluralFeminine", score: -1 },
    ]);
    expect(wordsWithWeakForms[1].weakestForms).toMatchObject([
      { language: Languages.French, form: "singularMasculine", score: 0 },
      { language: Languages.French, form: "pluralMasculine", score: 0 },
    ]);
  });

  test("should produce an empty array if no wordStats are provided", function() {
    const words3: Word[] = [
      new WordModel({
        english: {
          name: "black",
        },
        french: {
          name: "noir",
        },
        hasUniqueForm: false,
        lesson: "main_colors",
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
        lesson: "main_colors",
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
        lesson: "main_colors",
        topic: "colors",
      }),
    ];
    const wordStats3 = [
      null,
      new WordStatsModel({
        statsByForm: [
          { language: Languages.English, form: "uniqueForm", score: 1 },
          { language: Languages.French, form: "singularMasculine", score: 2 },
          { language: Languages.French, form: "pluralMasculine", score: 2 },
          { language: Languages.French, form: "singularFeminine", score: 1 },
          { language: Languages.French, form: "pluralFeminine", score: 1 },
        ],
      }),
      null,
    ];
    const wordsWithWeakForms = appendWeakestForms(words3, wordStats3);
    expect(wordsWithWeakForms).toHaveLength(3);
    expect(wordsWithWeakForms[0].weakestForms).toEqual([]);
    expect(wordsWithWeakForms[1].weakestForms).toMatchObject([
      { language: Languages.English, form: "uniqueForm", score: 1 },
      {
        language: Languages.French,
        form: "singularFeminine",
        score: 1,
      },
      { language: Languages.French, form: "pluralFeminine", score: 1 },
    ]);
    expect(wordsWithWeakForms[2].weakestForms).toEqual([]);
  });
});
