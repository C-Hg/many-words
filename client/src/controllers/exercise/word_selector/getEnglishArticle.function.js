const englishArticles = {
  definite: {
    sing: "the",
    plur: "the",
  },
  indefinite: {
    sing: "a",
    plur: "",
  },
};
// TODO: use CONSTANTS for definite e.g. ?
const getEnglishArticle = (englishForm, isDefinite, isAn) => {
  if (isAn && !isDefinite && englishForm === "sing") {
    return "an";
  }
  const articleForm = isDefinite ? "definite" : "indefinite";
  return englishArticles[articleForm][englishForm];
};

export default getEnglishArticle;
