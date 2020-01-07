import FrenchWord from "./frenchWord.interface";

// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required

// void objects are impossible because not returned from checkFrAlternative function
// checks that mutually exclusive properties are not present

const checkFrenchFormat = (frenchWords: Partial<FrenchWord>[]): boolean => {
  frenchWords.forEach(frenchWord => {
    const {
      uniqueForm,
      singularMasculine,
      singularFeminine,
      pluralMasculine,
      pluralFeminine,
      acceptedForms,
    } = frenchWord;

    if (!acceptedForms || !acceptedForms.length) {
      throw new Error(
        `\\033[1;31m[CheckFrenchFormat] no 'acceptedForms' property for ${frenchWord}\\033[0;0m`
      );
    }
    if (
      (singularMasculine ||
        singularFeminine ||
        pluralMasculine ||
        pluralFeminine) &&
      uniqueForm
    ) {
      throw new Error(
        `\\033[1;31m[CheckFrenchFormat] a French word cannot have a unique form AND another form, ${frenchWord}\\033[0;0m`
      );
    }

    // checks that fields are not empty, and that properties other than unique form are not alone
    // checks that acceptedForms matches the registered forms
    if (singularMasculine) {
      if (!singularFeminine && !pluralMasculine) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] singularMasculine form alone, ${frenchWord}\\033[0;0m`
        );
      }
      if (
        !acceptedForms.includes("singularMasculine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] acceptedForms property not matching singularMasculine, ${frenchWord}\\033[0;0m`
        );
      }
      if (singularMasculine === "") {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] empty singularMasculine, ${frenchWord} \\033[0;0m`
        );
      }
    }

    if (singularFeminine) {
      if (!pluralFeminine && !singularMasculine) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] singularFeminine alone, ${frenchWord}\\033[0;0m`
        );
      }
      if (
        !acceptedForms.includes("singularFeminine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] missing acceptedForms, ${frenchWord}\\033[0;0m`
        );
      }
      if (singularFeminine === "") {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] empty singularFeminine, ${frenchWord}\\033[0;0m`
        );
      }
    }

    if (pluralMasculine) {
      if (!singularMasculine && !pluralFeminine) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] pluralMasculine alone, ${frenchWord}\\033[0;0m`
        );
      }
      if (
        !acceptedForms.includes("pluralMasculine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] missing acceptedForms property, ${frenchWord}\\033[0;0m`
        );
      }
      if (pluralMasculine === "") {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] empty pluralMasculine, ${frenchWord}\\033[0;0m`
        );
      }
    }

    if (pluralFeminine) {
      if (!pluralMasculine && !singularFeminine) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] pluralFeminine alone, ${frenchWord}\\033[0;0m`
        );
      }
      if (
        !acceptedForms.includes("pluralFeminine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] missing acceptedForms property, ${frenchWord}\\033[0;0m`
        );
      }
      if (pluralFeminine === "") {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] empty pluralFeminine, ${frenchWord}\\033[0;0m`
        );
      }
    }

    if (uniqueForm) {
      if (acceptedForms[0] !== "uniqueForm" || acceptedForms.length > 1) {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] acceptedForms not matching uniqueForm, ${frenchWord}\\033[0;0m`
        );
      }
      if (uniqueForm === "") {
        throw new Error(
          `\\033[1;31m[CheckFrenchFormat] empty uniqueForm, ${frenchWord}\\033[0;0m`
        );
      }
    }
  });
  return true;
};

export default checkFrenchFormat;
