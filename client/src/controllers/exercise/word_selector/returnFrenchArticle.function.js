import frenchArticles from "../../../content/articles/frenchArticles";

const returnFrenchArticle = (frenchForm, articleForm, isLApostrophe) => {
  if (
    isLApostrophe &&
    articleForm === "definite" &&
    (frenchForm === "masc_sing" || frenchForm === "fem_sing")
  ) {
    return "l'";
  }
  return frenchArticles[articleForm][frenchForm];
};

export default returnFrenchArticle;
