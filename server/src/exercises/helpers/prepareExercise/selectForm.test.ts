import selectForm from "./selectForm.function";

import { Word } from "../../../graphql/types";

const word0: Word = {
  english: {
    words: [
      {
        form: "uniqueForm",
        values: ["to bark", "bark"],
      },
    ],
    name: "bark",
  },
  french: {
    words: [
      {
        form: "uniqueForm",
        values: ["aboyer"],
      },
    ],
    name: "aboyer",
  },
  hasUniqueForm: true,
  lesson: "animalsBasics",
  topic: "animals",
  type: "verb",
  weakestForms: [],
};

const word1: Word = {
  english: {
    words: [
      {
        form: "uniqueForm",
        values: ["to bark", "bark"],
      },
    ],
    name: "bark",
  },
  french: {
    words: [
      {
        form: "uniqueForm",
        values: ["aboyer"],
      },
    ],
    name: "aboyer",
  },
  hasUniqueForm: true,
  lesson: "animalsBasics",
  topic: "animals",
  type: "verb",
  weakestForms: [
    {
      language: "french",
      form: "uniqueForm",
      score: -3,
    },
  ],
};

const word2: Word = {
  english: {
    words: [
      {
        form: "uniqueForm",
        values: ["to bark", "bark"],
      },
    ],
    name: "bark",
  },
  french: {
    words: [
      {
        form: "uniqueForm",
        values: ["aboyer"],
      },
    ],
    name: "aboyer",
  },
  hasUniqueForm: true,
  lesson: "animalsBasics",
  topic: "animals",
  type: "verb",
  weakestForms: [
    {
      language: "english",
      form: "uniqueForm",
      score: 0,
    },
  ],
};

const word3: Word = {
  english: {
    words: [
      {
        form: "singular",
        values: ["dog"],
      },
      {
        form: "plural",
        values: ["dogs"],
      },
    ],
    name: "dog",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["chien"],
      },
      {
        form: "pluralMasculine",
        values: ["chiens"],
      },
    ],
    name: "chien",
  },
  hasUniqueForm: false,
  lesson: "animalsBasics",
  topic: "animals",
  type: "noun",
  weakestForms: [],
};

const word4: Word = {
  english: {
    words: [
      {
        form: "singular",
        values: ["dog"],
      },
      {
        form: "plural",
        values: ["dogs"],
      },
    ],
    name: "dog",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["chien"],
      },
      {
        form: "pluralMasculine",
        values: ["chiens"],
      },
    ],
    name: "chien",
  },
  hasUniqueForm: false,
  lesson: "animalsBasics",
  topic: "animals",
  type: "noun",
  weakestForms: [
    {
      language: "english",
      form: "singular",
      score: -0.5,
    },
    {
      language: "english",
      form: "plural",
      score: -0.5,
    },
  ],
};

const word5: Word = {
  english: {
    words: [
      {
        form: "singular",
        values: ["dog"],
      },
      {
        form: "plural",
        values: ["dogs"],
      },
    ],
    name: "dog",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["chien"],
      },
      {
        form: "pluralMasculine",
        values: ["chiens"],
      },
    ],
    name: "chien",
  },
  hasUniqueForm: false,
  lesson: "animalsBasics",
  topic: "animals",
  type: "noun",
  weakestForms: [
    {
      language: "french",
      form: "pluralMasculine",
      score: 3,
    },
  ],
};

describe("selectForm", () => {
  const anyLanguage = expect.stringMatching(/english|french/);

  it("should select uniqueForm with a random language", () => {
    const { form, language, wordToTranslate } = selectForm(word0);
    expect(form).toEqual("uniqueForm");
    expect(language).toEqual(anyLanguage);
    expect(wordToTranslate).toBeDefined();
  });

  it("should select a random form with a random language", () => {
    const { form, language, wordToTranslate } = selectForm(word3);
    expect(language).toEqual(anyLanguage);
    if (language === "french") {
      expect(form).toEqual(
        expect.stringMatching(/singularMasculine|pluralMasculine/)
      );
    } else {
      expect(form).toEqual(expect.stringMatching(/singular|plural/));
    }
    expect(wordToTranslate).toBeDefined();
  });

  it("should select uniqueForm, french with a random language", () => {
    const { form, language, wordToTranslate } = selectForm(word1);
    expect(form).toEqual("uniqueForm");
    expect(language).toEqual("french");
    expect(wordToTranslate).toEqual("aboyer");
  });

  it("should select uniqueForm, english", () => {
    const { form, language, wordToTranslate } = selectForm(word2);
    expect(form).toEqual("uniqueForm");
    expect(language).toEqual("english");
    expect(wordToTranslate).toEqual("to bark");
  });

  it("should select a random among several weak forms", () => {
    const { form, language, wordToTranslate } = selectForm(word4);
    expect(language).toEqual("english");
    expect(form).toEqual(expect.stringMatching(/singular|plural/));
    expect(wordToTranslate).toEqual(expect.stringMatching(/dog|dogs/));
  });

  it("should select the weakest forms", () => {
    const { form, language, wordToTranslate } = selectForm(word5);
    expect(language).toEqual("french");
    expect(form).toEqual("pluralMasculine");
    expect(wordToTranslate).toEqual("chiens");
  });
});
