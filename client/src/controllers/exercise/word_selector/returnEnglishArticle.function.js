import englishArticles from "../../../content/articles/englishArticles";

const returnEnglishArticle = (englishForm, articleForm, isAn) => {
  if (isAn && articleForm === "indefinite" && englishForm === "sing") {
    return "an";
  }
  return englishArticles[articleForm][englishForm];
};

export default returnEnglishArticle;
