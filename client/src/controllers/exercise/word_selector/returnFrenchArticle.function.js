import frenchArticles from "../../../content/articles/frenchArticles";

const returnFrenchArticle = (frenchForm, isDefinite, isLApostrophe) => {
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

export default returnFrenchArticle;
