import FrenchWord from "./frenchWord.interface";

// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required

// void objects are impossible because not returned from checkFrAlternative function
// checks that mutually exclusive properties are not present

const checkFrenchFormat = (frenchWords: FrenchWord[]): boolean => {
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
        `[CheckFrenchFormat] no 'acceptedForms' property for ${JSON.stringify(
          frenchWord
        )}`
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
      if (
        !acceptedForms.includes("singularMasculine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `[CheckFrenchFormat] acceptedForms property not matching singularMasculine, ${JSON.stringify(
            frenchWord
          )}`
        );
      }
      if (singularMasculine === "") {
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
      if (
        !acceptedForms.includes("singularFeminine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `[CheckFrenchFormat] missing acceptedForms, ${JSON.stringify(
            frenchWord
          )}`
        );
      }
      if (singularFeminine === "") {
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
      if (
        !acceptedForms.includes("pluralMasculine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `[CheckFrenchFormat] missing acceptedForms property, ${JSON.stringify(
            frenchWord
          )}`
        );
      }
      if (pluralMasculine === "") {
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
      if (
        !acceptedForms.includes("pluralFeminine") ||
        acceptedForms.length < 2
      ) {
        throw new Error(
          `[CheckFrenchFormat] missing acceptedForms property, ${JSON.stringify(
            frenchWord
          )}`
        );
      }
      if (pluralFeminine === "") {
        throw new Error(
          `[CheckFrenchFormat] empty pluralFeminine, ${JSON.stringify(
            frenchWord
          )}`
        );
      }
    }

    if (uniqueForm) {
      if (acceptedForms[0] !== "uniqueForm" || acceptedForms.length > 1) {
        throw new Error(
          `[CheckFrenchFormat] acceptedForms not matching uniqueForm, ${JSON.stringify(
            frenchWord
          )}`
        );
      }
      if (uniqueForm === "") {
        throw new Error(
          `[CheckFrenchFormat] empty uniqueForm, ${JSON.stringify(frenchWord)}`
        );
      }
    }
  });
  return true;
};

export default checkFrenchFormat;
