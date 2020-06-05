import getAnswers from "./getAnswers.function";

import { Word } from "../../../graphql/learn.types";
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
        values: ["grey", "gray"],
      },
    ],
    name: "grey",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["gris"],
      },
      {
        form: "singularFeminine",
        values: ["grise"],
      },
      {
        form: "pluralMasculine",
        values: ["gris"],
      },
      {
        form: "pluralFeminine",
        values: ["grises"],
      },
    ],
    name: "gris",
  },
  hasUniqueForm: false,
  lesson: "mainColors",
  topic: "colors",
  type: "adjective",
  weakestForms: [],
};

const word2: Word = {
  english: {
    words: [
      {
        form: "uniqueForm",
        values: ["dark"],
      },
    ],
    name: "dark",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["sombre", "noir", "foncé"],
      },
      {
        form: "singularFeminine",
        values: ["sombre", "noire", "foncée"],
      },
      {
        form: "pluralMasculine",
        values: ["sombres", "noirs", "foncés"],
      },
      {
        form: "pluralFeminine",
        values: ["sombres", "noires", "foncées"],
      },
    ],
    name: "sombre",
  },
  hasUniqueForm: false,
  lesson: "weather2",
  topic: "nature",
  type: "adjective",
  weakestForms: [],
};

const word3: Word = {
  english: {
    words: [
      {
        form: "singular",
        values: ["bird"],
      },
      {
        form: "plural",
        values: ["birds"],
      },
    ],
    name: "bird",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["oiseau"],
      },
      {
        form: "pluralMasculine",
        values: ["oiseaux"],
      },
    ],
    name: "oiseau",
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
        values: ["cat"],
      },
      {
        form: "plural",
        values: ["cats"],
      },
    ],
    name: "cat",
  },
  french: {
    words: [
      {
        form: "singularMasculine",
        values: ["chat"],
      },
      {
        form: "singularFeminine",
        values: ["chatte"],
      },
      {
        form: "pluralMasculine",
        values: ["chats"],
      },
      {
        form: "pluralFeminine",
        values: ["chattes"],
      },
    ],
    name: "chat",
  },
  hasUniqueForm: false,
  lesson: "animalsBasics",
  topic: "animals",
  type: "noun",
  weakestForms: [],
};

describe("getAnswers", () => {
  it("should return several uniqueForm in english, verb", () => {
    const acceptedAnswers = getAnswers(word0, "uniqueForm", "french");
    expect(acceptedAnswers).toEqual(["to bark", "bark"]);
  });

  it("should return single uniqueForm in french, verb", () => {
    const acceptedAnswers = getAnswers(word0, "uniqueForm", "english");
    expect(acceptedAnswers).toEqual(["aboyer"]);
  });

  it("should return 4 french forms, adjective", () => {
    const acceptedAnswers = getAnswers(word1, "uniqueForm", "english");
    expect(acceptedAnswers).toContain("gris");
    expect(acceptedAnswers).toContain("grise");
    expect(acceptedAnswers).toContain("grises");
    expect(acceptedAnswers).toHaveLength(4);
  });

  it("should return a single english uniqueForm, adjective", () => {
    const acceptedAnswers = getAnswers(word1, "singularMasculine", "french");
    expect(acceptedAnswers).toEqual(["grey", "gray"]);
  });

  it("should return 4 french forms, adjective", () => {
    const acceptedAnswers = getAnswers(word2, "uniqueForm", "english");
    expect(acceptedAnswers).toContain("sombre");
    expect(acceptedAnswers).toContain("noir");
    expect(acceptedAnswers).toContain("foncé");

    expect(acceptedAnswers).toContain("sombres");
    expect(acceptedAnswers).toContain("noirs");
    expect(acceptedAnswers).toContain("foncés");

    expect(acceptedAnswers).toContain("noire");
    expect(acceptedAnswers).toContain("foncée");

    expect(acceptedAnswers).toContain("noires");
    expect(acceptedAnswers).toContain("foncées");
    expect(acceptedAnswers).toHaveLength(12);
  });

  it("should return singular french form, name", () => {
    const acceptedAnswers = getAnswers(
      word3,
      "singular",
      "english",
      ARTICLE_FORMS.Definite
    );
    expect(acceptedAnswers).toEqual(["l'oiseau"]);
  });

  it("should return singular english form, name", () => {
    const acceptedAnswers = getAnswers(
      word3,
      "singularMasculine",
      "french",
      ARTICLE_FORMS.Definite
    );
    expect(acceptedAnswers).toEqual(["the bird"]);
  });

  it("should return singular english form, name", () => {
    const acceptedAnswers = getAnswers(
      word4,
      "pluralFeminine",
      "french",
      ARTICLE_FORMS.Indefinite
    );
    expect(acceptedAnswers).toEqual(["cats"]);
  });

  it("should return masculine and feminine french form, name", () => {
    const acceptedAnswers = getAnswers(
      word4,
      "singular",
      "english",
      ARTICLE_FORMS.Indefinite
    );
    expect(acceptedAnswers).toContain("un chat");
    expect(acceptedAnswers).toContain("une chatte");
    expect(acceptedAnswers).toHaveLength(2);
  });
});
