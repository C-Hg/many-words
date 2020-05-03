import selectForm from "./selectForm.function";

import { Word } from "../../../graphql/types";
import { FORMS } from "../../../stats/constants";
import { ARTICLE_FORMS } from "../../interfaces/name.interface";

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

const word6: Word = {
  english: {
    words: [
      {
        form: "uniqueForm",
        values: ["wild"],
      },
    ],
    name: "wild",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["sauvage"],
      },
      {
        form: "singularFeminine",
        values: ["sauvage"],
      },
      {
        form: "pluralMasculine",
        values: ["sauvages"],
      },
      {
        form: "pluralFeminine",
        values: ["sauvages"],
      },
    ],
    name: "sauvage",
  },
  hasUniqueForm: false,
  lesson: "animalsBasics",
  topic: "animals",
  type: "adjective",
  weakestForms: [
    {
      language: "french",
      form: "pluralMasculine",
      score: 3,
    },
    {
      language: "french",
      form: "singularMasculine",
      score: 3,
    },
  ],
};

describe("selectForm", () => {
  const anyLanguage = expect.stringMatching(/english|french/);

  it("should select uniqueForm with a random language, verb", () => {
    const { form, language, wordToTranslate } = selectForm(word0);
    expect(form).toEqual("uniqueForm");
    expect(language).toEqual(anyLanguage);
    expect(wordToTranslate).toBeDefined();
  });

  it("should select a random form with a random language, name", () => {
    const { form, language, wordToTranslate } = selectForm(
      word3,
      ARTICLE_FORMS.Definite
    );
    expect(language).toEqual(anyLanguage);
    // ------------      selected french      -------------------
    if (language === "french") {
      expect(form).toEqual(
        expect.stringMatching(/singularMasculine|pluralMasculine/)
      );
      if (form === FORMS.SingularMasculine) {
        expect(wordToTranslate).toEqual("le chien");
      } else {
        expect(wordToTranslate).toEqual("les chiens");
      }
      // ------------      selected english     -------------------
    } else {
      expect(form).toEqual(expect.stringMatching(/singular|plural/));
      if (form === FORMS.Singular) {
        expect(wordToTranslate).toEqual("the dog");
      } else {
        expect(wordToTranslate).toEqual("the dogs");
      }
    }
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

  it("should select randomly among several weak forms", () => {
    const { form, language, wordToTranslate } = selectForm(
      word4,
      ARTICLE_FORMS.Indefinite
    );
    expect(language).toEqual("english");
    expect(form).toEqual(expect.stringMatching(/singular|plural/));
    if (form === FORMS.Singular) {
      expect(wordToTranslate).toEqual("a dog");
    } else {
      expect(wordToTranslate).toEqual("dogs");
    }
  });

  it("should select randomly among several weak forms", () => {
    const { form, language, wordToTranslate } = selectForm(word6, undefined);
    expect(language).toEqual("french");
    expect(form).toEqual(
      expect.stringMatching(/singularMasculine|pluralMasculine/)
    );
    if (form === FORMS.SingularMasculine) {
      expect(wordToTranslate).toEqual("sauvage");
    } else {
      expect(wordToTranslate).toEqual("sauvages");
    }
  });

  it("should select the weakest forms", () => {
    const { form, language, wordToTranslate } = selectForm(
      word5,
      ARTICLE_FORMS.Definite
    );
    expect(language).toEqual("french");
    expect(form).toEqual("pluralMasculine");
    expect(wordToTranslate).toEqual("les chiens");
  });
});
