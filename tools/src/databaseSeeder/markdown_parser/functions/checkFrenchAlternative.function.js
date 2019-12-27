const regex = require("../markdownRegex");

// this function fetches the data from a given column in the FR table of the Markdown document
// if data is not null, returns an object with properly formatted data
// however data still needs validation, done by checkFrFormat function

const checkFrenchAlternative = (altName, document) => {
  const mascSingRegex = regex[`frMascSing${altName}`];
  const mascPlurRegex = regex[`frMascPlur${altName}`];
  const femSingRegex = regex[`frFemSing${altName}`];
  const femPlurRegex = regex[`frFemPlur${altName}`];
  const uniqueFormRegex = regex[`frUnique${altName}`];
  const acceptedForms = [];
  const result = {};

  const forms = [
    ["uniqueForm", uniqueFormRegex],
    [{ number: "singular", gender: "masculine" }, mascSingRegex],
    [{ number: "singular", gender: "feminine" }, femSingRegex],
    [{ number: "plural", gender: "masculine" }, mascPlurRegex],
    [{ number: "plural", gender: "feminine" }, femPlurRegex],
  ];
  forms.forEach(([form, formRegex]) => {
    const match = document.match(formRegex);
    if (match) {
      acceptedForms.push(form);
      if (form === "uniqueForm") {
        [result[form]] = match;
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
