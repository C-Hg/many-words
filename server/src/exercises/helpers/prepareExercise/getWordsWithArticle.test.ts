import getWordsWithArticle from "./getWordsWithArticle.function";

import { ARTICLE_FORMS } from "../../interfaces/name.interface";

describe("getWordsWithArticle", () => {
  it("should select french singular definite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["chat"],
      ARTICLE_FORMS.Definite,
      "singularMasculine",
      "french"
    );
    expect(wordWithArticle).toEqual(["le chat"]);
  });

  it("should select french plural definite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["chats", "oiseaux", "plumes"],
      ARTICLE_FORMS.Definite,
      "pluralMasculine",
      "french"
    );
    expect(wordWithArticle).toEqual(["les chats", "les oiseaux", "les plumes"]);
  });

  it("should select french singular indefinite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["chat", "poisson"],
      ARTICLE_FORMS.Indefinite,
      "singularMasculine",
      "french"
    );
    expect(wordWithArticle).toEqual(["un chat", "un poisson"]);
  });

  it("should select french plural indefinite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["chats"],
      ARTICLE_FORMS.Indefinite,
      "pluralMasculine",
      "french"
    );
    expect(wordWithArticle).toEqual(["des chats"]);
  });

  it("should select french singular definite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["chat", "oiseau"],
      ARTICLE_FORMS.Definite,
      "singularMasculine",
      "french"
    );
    expect(wordWithArticle).toEqual(["le chat", "l'oiseau"]);
  });

  it("should select english singular definite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["cat", "bird"],
      ARTICLE_FORMS.Definite,
      "singular",
      "english"
    );
    expect(wordWithArticle).toEqual(["the cat", "the bird"]);
  });

  it("should select english plural indefinite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["cats"],
      ARTICLE_FORMS.Definite,
      "plural",
      "english"
    );
    expect(wordWithArticle).toEqual(["the cats"]);
  });

  it("should select english plural indefinite article", () => {
    const wordWithArticle = getWordsWithArticle(
      ["cats", "birds"],
      ARTICLE_FORMS.Indefinite,
      "plural",
      "english"
    );
    expect(wordWithArticle).toEqual(["cats", "birds"]);
  });

  it("should select english singular indefinite article (an)", () => {
    const wordWithArticle = getWordsWithArticle(
      ["apple", "ewe", "owl", "island", "umbrella"],
      ARTICLE_FORMS.Indefinite,
      "singular",
      "english"
    );
    expect(wordWithArticle).toEqual([
      "an apple",
      "an ewe",
      "an owl",
      "an island",
      "an umbrella",
    ]);
  });

  it("should select french singular definite article (l')", () => {
    const wordWithArticle = getWordsWithArticle(
      ["orange", "arrivée", "histoire", "urgence", "ivresse", "élite", "ère"],
      ARTICLE_FORMS.Definite,
      "singularFeminine",
      "french"
    );
    expect(wordWithArticle).toEqual([
      "l'orange",
      "l'arrivée",
      "l'histoire",
      "l'urgence",
      "l'ivresse",
      "l'élite",
      "l'ère",
    ]);
  });

  it("should select french singular definite article (l')", () => {
    const wordWithArticle = getWordsWithArticle(
      ["âge", "été", "oubli", "îlot"],
      ARTICLE_FORMS.Definite,
      "singularMasculine",
      "french"
    );
    expect(wordWithArticle).toEqual(["l'âge", "l'été", "l'oubli", "l'îlot"]);
  });
});
