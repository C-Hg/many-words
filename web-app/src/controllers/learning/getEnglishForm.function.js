const getEnglishForm = (number, acceptedForms) => {
  let englishForm = acceptedForms[0];
  if (acceptedForms.includes("sing") && number === "singular") {
    englishForm = "sing";
  }

  if (acceptedForms.includes("plur") && number === "plural") {
    englishForm = "plur";
  }

  return englishForm;
};

export default getEnglishForm;
