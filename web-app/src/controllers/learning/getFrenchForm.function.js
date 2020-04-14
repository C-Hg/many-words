const getFrenchForm = (number, gender, acceptedForms) => {
  let frenchForm = acceptedForms[0];
  if (
    acceptedForms.includes("masc_sing") &&
    ((number === "singular" && gender === "masculine") ||
      (!acceptedForms.includes("masc_plur") && gender === "masculine") ||
      (number === "singular" && !acceptedForms.includes("fem_sing")))
  ) {
    frenchForm = "masc_sing";
  }

  if (
    acceptedForms.includes("fem_sing") &&
    ((number === "singular" && gender === "feminine") ||
      (!acceptedForms.includes("fem_plur") && gender === "feminine") ||
      (number === "singular" && !acceptedForms.includes("masc_sing")))
  ) {
    frenchForm = "fem_sing";
  }

  if (
    acceptedForms.includes("masc_plur") &&
    ((number === "plural" && gender === "masculine") ||
      (!acceptedForms.includes("masc_sing") && gender === "masculine") ||
      (number === "plural" && !acceptedForms.includes("fem_plur")))
  ) {
    frenchForm = "masc_plur";
  }

  if (
    acceptedForms.includes("fem_plur") &&
    ((number === "plural" && gender === "feminine") ||
      (!acceptedForms.includes("fem_sing") && gender === "feminine") ||
      (number === "plural" && !acceptedForms.includes("masc_plur")))
  ) {
    frenchForm = "fem_plur";
  }

  return frenchForm;
};

export default getFrenchForm;
