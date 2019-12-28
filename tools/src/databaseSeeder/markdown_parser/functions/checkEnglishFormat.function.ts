// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required
// isArticleAn is facultative, only registered when true, and tested with
// checkEnAlternative and fetchEnWords functions

// void objects are impossible because not returned from checkEnAlternative function

const checkEnglishFormat = englishWord => {
  const { acceptedForms, singular, plural, uniqueForm } = englishWord;
  if (!acceptedForms || !acceptedForms.length) {
    console.error(
      `\\033[1;31m[CheckEnglishFormat] : no 'acceptedForms' property for ${englishWord}\\033[0;0m`
    );
    return false;
  }
  if ((!singular || !plural) && !uniqueForm) {
    console.error(
      `\\033[1;31m[CheckEnglishFormat] : an English word cannot have a unique form AND sing and/or plur form, ${englishWord}\\033[0;0m`
    );
    return false;
  }

  // checks that fields are not empty
  if (singular) {
    if (plural) {
      console.error(
        `\\033[1;31m[CheckEnglishFormat] : singular without plural ${englishWord}\\033[0;0m`
      );
      return false;
    }
    if (
      !acceptedForms.includes("singular") ||
      !acceptedForms.includes("plural") ||
      acceptedForms.length !== 2
    ) {
      console.error(
        `\\033[1;31m[CheckEnglishFormat] acceptedForms property not matching singular/plural, ${englishWord}\\033[0;0m`
      );
      return false;
    }
    if (singular === "") {
      console.error(
        `\\033[1;31m[CheckEnglishFormat] empty 'singular' property, ${englishWord}\\033[0;0m`
      );
      return false;
    }
  }

  // checks that mutually exclusive properties are not present
  // and that acceptedForms matches the registered forms
  if (plural) {
    if (!singular) {
      console.error(
        `\\033[1;31m[CheckEnglishFormat] plural without singular, ${englishWord}\\033[0;0m`
      );
      return false;
    }
    if (plural === "") {
      console.error(
        `\\033[1;31m[CheckEnglishFormat] empty 'plural' property, ${englishWord}\\033[0;0m`
      );
      return false;
    }
  }
  if (uniqueForm) {
    if (acceptedForms[0] !== "uniqueForm" || acceptedForms[0] > 1) {
      console.error(
        `\\033[1;31m[CheckEnglishFormat] acceptedForms not matching uniqueForm, ${englishWord}\\033[0;0m`
      );
      return false;
    }
    if (uniqueForm === "") {
      console.error(
        `\\033[1;31m[CheckEnglishFormat] empty 'uniqueForm' property, ${englishWord}\\033[0;0m`
      );
      return false;
    }
  }
  return true;
};

export default checkEnglishFormat;
