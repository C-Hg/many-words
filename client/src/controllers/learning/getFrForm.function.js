exports.getFrForm = function(singOrPlur, mascOrFem, acceptedForms) {
  let frForm = acceptedForms[0];
  if (
    acceptedForms.includes("masc_sing") &&
    ((singOrPlur === "singular" && mascOrFem === "masculine") ||
      (!acceptedForms.includes("masc_plur") && mascOrFem === "masculine") ||
      (singOrPlur === "singular" && !acceptedForms.includes("fem_sing")))
  ) {
    frForm = "masc_sing";
  }

  if (
    acceptedForms.includes("fem_sing") &&
    ((singOrPlur === "singular" && mascOrFem === "feminine") ||
      (!acceptedForms.includes("fem_plur") && mascOrFem === "feminine") ||
      (singOrPlur === "singular" && !acceptedForms.includes("masc_sing")))
  ) {
    frForm = "fem_sing";
  }

  if (
    acceptedForms.includes("masc_plur") &&
    ((singOrPlur === "plural" && mascOrFem === "masculine") ||
      (!acceptedForms.includes("masc_sing") && mascOrFem === "masculine") ||
      (singOrPlur === "plural" && !acceptedForms.includes("fem_plur")))
  ) {
    frForm = "masc_plur";
  }

  if (
    acceptedForms.includes("fem_plur") &&
    ((singOrPlur === "plural" && mascOrFem === "feminine") ||
      (!acceptedForms.includes("fem_sing") && mascOrFem === "feminine") ||
      (singOrPlur === "plural" && !acceptedForms.includes("masc_plur")))
  ) {
    frForm = "fem_plur";
  }

  return frForm;
};
