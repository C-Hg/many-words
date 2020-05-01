import {
  FrenchWord,
  FrenchForms,
  FrenchFormValue,
} from "./frenchWord.interface";

const getForm = (words: FrenchWord, form: FrenchForms): FrenchFormValue => {
  return words.find((word) => word.form === form);
};

/**
 * Checks that the informations retrieved from the markdown file
 * are not mutually exclusive for a specific word
 */
const checkFrenchFormat = (frenchWord: FrenchWord): void => {
  const singularMasculine = getForm(frenchWord, "singularMasculine");
  const singularFeminine = getForm(frenchWord, "singularFeminine");
  const pluralMasculine = getForm(frenchWord, "pluralMasculine");
  const pluralFeminine = getForm(frenchWord, "pluralFeminine");
  const uniqueForm = getForm(frenchWord, "uniqueForm");

  if (
    (singularMasculine ||
      singularFeminine ||
      pluralMasculine ||
      pluralFeminine) &&
    uniqueForm
  ) {
    throw new Error(
      `[CheckFrenchFormat] a French word cannot have a unique form AND another form, ${JSON.stringify(
        frenchWord
      )}`
    );
  }

  // checks that fields are not empty, and that properties other than unique form are not alone
  // checks that acceptedForms matches the registered forms
  if (singularMasculine) {
    if (!singularFeminine && !pluralMasculine) {
      throw new Error(
        `[CheckFrenchFormat] singularMasculine form alone, ${JSON.stringify(
          frenchWord
        )}`
      );
    }
    if (singularMasculine.values[0] === "") {
      throw new Error(
        `[CheckFrenchFormat] empty singularMasculine, ${JSON.stringify(
          frenchWord
        )} `
      );
    }
  }

  if (singularFeminine) {
    if (!pluralFeminine && !singularMasculine) {
      throw new Error(
        `[CheckFrenchFormat] singularFeminine alone, ${JSON.stringify(
          frenchWord
        )}`
      );
    }
    if (singularFeminine.values[0] === "") {
      throw new Error(
        `[CheckFrenchFormat] empty singularFeminine, ${JSON.stringify(
          frenchWord
        )}`
      );
    }
  }

  if (pluralMasculine) {
    if (!singularMasculine && !pluralFeminine) {
      throw new Error(
        `[CheckFrenchFormat] pluralMasculine alone, ${JSON.stringify(
          frenchWord
        )}`
      );
    }
    if (pluralMasculine.values[0] === "") {
      throw new Error(
        `[CheckFrenchFormat] empty pluralMasculine, ${JSON.stringify(
          frenchWord
        )}`
      );
    }
  }

  if (pluralFeminine) {
    if (!pluralMasculine && !singularFeminine) {
      throw new Error(
        `[CheckFrenchFormat] pluralFeminine alone, ${JSON.stringify(
          frenchWord
        )}`
      );
    }
    if (pluralFeminine.values[0] === "") {
      throw new Error(
        `[CheckFrenchFormat] empty pluralFeminine, ${JSON.stringify(
          frenchWord
        )}`
      );
    }
  }

  if (uniqueForm) {
    if (uniqueForm.values[0] === "") {
      throw new Error(
        `[CheckFrenchFormat] empty uniqueForm, ${JSON.stringify(frenchWord)}`
      );
    }
  }
};

export default checkFrenchFormat;
