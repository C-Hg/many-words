import FrenchWord from "../../../common/models/frenchWord.interface";
import getRegex from "../markdownRegex";
import MarkdownColumns from "../markdownColumns.interface";

// this function fetches the data from a given column in the FR table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkFrFormat function

const checkFrenchAlternative = (
  column: keyof MarkdownColumns,
  document: string
): Partial<FrenchWord> => {
  const singularMasculineRegex = getRegex("frenchSingularMasculine", column);
  const singularFeminineRegex = getRegex("frenchSingularFeminine", column);
  const pluralMasculineRegex = getRegex("frenchPluralMasculine", column);
  const pluralFeminineRegex = getRegex("frenchPluralFeminine", column);
  const uniqueFormRegex = getRegex("frenchUniqueForm", column);
  const acceptedForms = [];
  const result: Partial<FrenchWord> = {};

  const forms = [
    ["uniqueForm", uniqueFormRegex],
    [{ number: "singular", gender: "masculine" }, singularMasculineRegex],
    [{ number: "singular", gender: "feminine" }, singularFeminineRegex],
    [{ number: "plural", gender: "masculine" }, pluralMasculineRegex],
    [{ number: "plural", gender: "feminine" }, pluralFeminineRegex],
  ];
  forms.forEach(([form, formRegex]) => {
    const match = document.match(formRegex);
    if (match) {
      acceptedForms.push(form);
      if (form === "uniqueForm") {
        // eslint-disable-next-line prefer-destructuring
        result.uniqueForm = match[0];
      } else {
        const { number, gender } = form;
        if (result[number] === undefined) {
          result[number] = {};
        }
        // eslint-disable-next-line prefer-destructuring
        result[number][gender] = match[0];
      }
    }
  });

  if (Object.keys(result).length) {
    result.acceptedForms = acceptedForms;
    return result;
  }
  return null;
};

export default checkFrenchAlternative;
