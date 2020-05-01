import {
  EnglishWord,
  EnglishForms,
  EnglishFormValue,
} from "./englishWord.interface";

const getForm = (words: EnglishWord, form: EnglishForms): EnglishFormValue => {
  return words.find((word) => word.form === form);
};

/**
 * Checks that the informations retrieved from the markdown file
 * are not mutually exclusive for a specific word
 */
const checkEnglishFormat = (englishWord: EnglishWord): void => {
  if (englishWord.length === 0) {
    throw new Error(`[CheckEnglishFormat] : void English Word`);
  }

  const singular = getForm(englishWord, "singular");
  const plural = getForm(englishWord, "plural");
  const uniqueForm = getForm(englishWord, "uniqueForm");

  if ((!singular || !plural) && !uniqueForm) {
    throw new Error(
      `[CheckEnglishFormat] : an English word cannot have a unique form AND sing and/or plur form, ${JSON.stringify(
        englishWord
      )}`
    );
  }

  // checks that fields are not empty
  if (singular) {
    if (!plural) {
      throw new Error(
        `[CheckEnglishFormat] : singular without plural ${JSON.stringify(
          englishWord
        )}`
      );
    }
    if (singular.values[0] === "") {
      throw new Error(
        `[CheckEnglishFormat] empty 'singular' property, ${JSON.stringify(
          englishWord
        )}`
      );
    }
  }

  // checks that mutually exclusive properties are not present
  // and that acceptedForms matches the registered forms
  if (plural) {
    if (!singular) {
      throw new Error(
        `[CheckEnglishFormat] plural without singular, ${JSON.stringify(
          englishWord
        )}`
      );
    }
    if (plural.values.length === 0) {
      throw new Error(
        `[CheckEnglishFormat] empty 'plural' property, ${JSON.stringify(
          englishWord
        )}`
      );
    }
  }
  if (uniqueForm) {
    if (uniqueForm.values[0] === "") {
      throw new Error(
        `[CheckEnglishFormat] empty 'uniqueForm' property, ${JSON.stringify(
          englishWord
        )}`
      );
    }
  }
};

export default checkEnglishFormat;
