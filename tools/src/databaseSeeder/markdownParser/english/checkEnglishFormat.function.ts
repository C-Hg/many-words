import EnglishWord from "./englishWord.interface";

// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required

// void objects are impossible because not returned from checkEnAlternative function

const checkEnglishFormat = (englishWords: EnglishWord[]): boolean => {
  if (!englishWords) {
    throw new Error(`[CheckEnglishFormat] : void English Word`);
  }

  englishWords.forEach(englishWord => {
    const { acceptedForms, singular, plural, uniqueForm } = englishWord;
    if (!acceptedForms || !acceptedForms.length) {
      throw new Error(
        `[CheckEnglishFormat] : no 'acceptedForms' property for ${JSON.stringify(
          englishWord
        )}`
      );
    }
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
      if (
        !acceptedForms.includes("singular") ||
        !acceptedForms.includes("plural") ||
        acceptedForms.length !== 2
      ) {
        throw new Error(
          `[CheckEnglishFormat] acceptedForms property not matching singular/plural, ${JSON.stringify(
            englishWord
          )}`
        );
      }
      if (singular === "") {
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
      if (plural === "") {
        throw new Error(
          `[CheckEnglishFormat] empty 'plural' property, ${JSON.stringify(
            englishWord
          )}`
        );
      }
    }
    if (uniqueForm) {
      if (acceptedForms[0] !== "uniqueForm" || acceptedForms.length > 1) {
        throw new Error(
          `[CheckEnglishFormat] acceptedForms not matching uniqueForm, ${JSON.stringify(
            englishWord
          )}`
        );
      }
      if (uniqueForm === "") {
        throw new Error(
          `[CheckEnglishFormat] empty 'uniqueForm' property, ${JSON.stringify(
            englishWord
          )}`
        );
      }
    }
  });
  return true;
};

export default checkEnglishFormat;