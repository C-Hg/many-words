const frenchArticles = {
  definite: {
    masc_sing: "le",
    masc_plur: "les",
    fem_sing: "la",
    fem_plur: "les",
  },
  indefinite: {
    masc_sing: "un",
    masc_plur: "des",
    fem_sing: "une",
    fem_plur: "des",
  },
};

const getFrenchArticle = (frenchForm, isDefinite, isLApostrophe) => {
  if (
    isLApostrophe &&
    isDefinite &&
    (frenchForm === "masc_sing" || frenchForm === "fem_sing")
  ) {
    return "l'";
  }
  const articleFrom = isDefinite ? "definite" : "indefinite";
  return frenchArticles[articleFrom][frenchForm];
};

export default getFrenchArticle;
