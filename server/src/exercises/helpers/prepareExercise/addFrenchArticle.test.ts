import addFrenchArticle from "./addFrenchArticle.function";

import { FORMS } from "../../../stats/constants";
import { ARTICLE_FORMS } from "../../types/name.interface";

describe("addFrenchArticle", () => {
  it("should add definite article", () => {
    const result = addFrenchArticle(
      "chien",
      ARTICLE_FORMS.Definite,
      FORMS.SingularMasculine
    );
    expect(result).toEqual("le chien");
  });

  it("should add definite article", () => {
    const result = addFrenchArticle(
      "oiseau",
      ARTICLE_FORMS.Definite,
      FORMS.SingularMasculine
    );
    expect(result).toEqual("l'oiseau");
  });

  it("should add definite article", () => {
    const result = addFrenchArticle(
      "vallée",
      ARTICLE_FORMS.Definite,
      FORMS.SingularFeminine
    );
    expect(result).toEqual("la vallée");
  });

  it("should add definite article", () => {
    const result = addFrenchArticle(
      "oie",
      ARTICLE_FORMS.Definite,
      FORMS.SingularFeminine
    );
    expect(result).toEqual("l'oie");
  });

  it("should add definite article", () => {
    const result = addFrenchArticle(
      "vallées",
      ARTICLE_FORMS.Definite,
      FORMS.PluralFeminine
    );
    expect(result).toEqual("les vallées");
  });

  it("should add definite article", () => {
    const result = addFrenchArticle(
      "jeux",
      ARTICLE_FORMS.Definite,
      FORMS.PluralMasculine
    );
    expect(result).toEqual("les jeux");
  });

  it("should add indefinite article", () => {
    const result = addFrenchArticle(
      "leçon",
      ARTICLE_FORMS.Indefinite,
      FORMS.SingularFeminine
    );
    expect(result).toEqual("une leçon");
  });

  it("should add indefinite article", () => {
    const result = addFrenchArticle(
      "excuse",
      ARTICLE_FORMS.Indefinite,
      FORMS.SingularFeminine
    );
    expect(result).toEqual("une excuse");
  });

  it("should add indefinite article", () => {
    const result = addFrenchArticle(
      "jeu",
      ARTICLE_FORMS.Indefinite,
      FORMS.SingularMasculine
    );
    expect(result).toEqual("un jeu");
  });

  it("should add indefinite article", () => {
    const result = addFrenchArticle(
      "jeux",
      ARTICLE_FORMS.Indefinite,
      FORMS.PluralMasculine
    );
    expect(result).toEqual("des jeux");
  });

  it("should add indefinite article", () => {
    const result = addFrenchArticle(
      "sorties",
      ARTICLE_FORMS.Indefinite,
      FORMS.PluralFeminine
    );
    expect(result).toEqual("des sorties");
  });

  it("should add indefinite article", () => {
    const result = addFrenchArticle(
      "oublis",
      ARTICLE_FORMS.Indefinite,
      FORMS.PluralFeminine
    );
    expect(result).toEqual("des oublis");
  });
});
