import addEnglishArticle from "./addEnglishArticle.function";

import { FORMS } from "../../../stats/constants";
import { ARTICLE_FORMS } from "../../interfaces/name.interface";

describe("addEnglishArticle", () => {
  it("should add definite article", () => {
    const result = addEnglishArticle(
      "dog",
      ARTICLE_FORMS.Definite,
      FORMS.Singular
    );
    expect(result).toEqual("the dog");
  });

  it("should add definite article", () => {
    const result = addEnglishArticle(
      "dogs",
      ARTICLE_FORMS.Definite,
      FORMS.Plural
    );
    expect(result).toEqual("the dogs");
  });

  it("should add indefinite article", () => {
    const result = addEnglishArticle(
      "dog",
      ARTICLE_FORMS.Indefinite,
      FORMS.Singular
    );
    expect(result).toEqual("a dog");
  });

  it("should add indefinite article", () => {
    const result = addEnglishArticle(
      "apple",
      ARTICLE_FORMS.Indefinite,
      FORMS.Singular
    );
    expect(result).toEqual("an apple");
  });
});
