import EnglishWord from "./englishWord.interface";

// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required

// void objects are impossible because not returned from checkEnAlternative function

const checkEnglishFormat = (englishWords: Partial<EnglishWord>[]): boolean => {
  englishWords.forEach(englishWord => {
    const { acceptedForms, singular, plural, uniqueForm } = englishWord;
    if (!acceptedForms || !acceptedForms.length) {
      throw new Error(
        `\\033[1;31m[CheckEnglishFormat] : no 'acceptedForms' property for ${englishWord}\\033[0;0m`
      );
    }
    if ((!singular || !plural) && !uniqueForm) {
      throw new Error(
        `\\033[1;31m[CheckEnglishFormat] : an English word cannot have a unique form AND sing and/or plur form, ${englishWord}\\033[0;0m`
      );
    }

    // checks that fields are not empty
    if (singular) {
      if (plural) {
        throw new Error(
          `\\033[1;31m[CheckEnglishFormat] : singular without plural ${englishWord}\\033[0;0m`
        );
      }
      if (
        !acceptedForms.includes("singular") ||
        !acceptedForms.includes("plural") ||
        acceptedForms.length !== 2
      ) {
        throw new Error(
          `\\033[1;31m[CheckEnglishFormat] acceptedForms property not matching singular/plural, ${englishWord}\\033[0;0m`
        );
      }
      if (singular === "") {
        throw new Error(
          `\\033[1;31m[CheckEnglishFormat] empty 'singular' property, ${englishWord}\\033[0;0m`
        );
      }
    }

    // checks that mutually exclusive properties are not present
    // and that acceptedForms matches the registered forms
    if (plural) {
      if (!singular) {
        throw new Error(
          `\\033[1;31m[CheckEnglishFormat] plural without singular, ${englishWord}\\033[0;0m`
        );
      }
      if (plural === "") {
        throw new Error(
          `\\033[1;31m[CheckEnglishFormat] empty 'plural' property, ${englishWord}\\033[0;0m`
        );
      }
    }
    if (uniqueForm) {
      if (acceptedForms[0] !== "uniqueForm" || acceptedForms.length > 1) {
        throw new Error(
          `\\033[1;31m[CheckEnglishFormat] acceptedForms not matching uniqueForm, ${englishWord}\\033[0;0m`
        );
      }
      if (uniqueForm === "") {
        throw new Error(
          `\\033[1;31m[CheckEnglishFormat] empty 'uniqueForm' property, ${englishWord}\\033[0;0m`
        );
      }
    }
  });
  return true;
};

export default checkEnglishFormat;
