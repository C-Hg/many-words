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

const getEnglishArticle = (englishForm, articleForm, isAn) => {
  if (isAn && articleForm === "indefinite" && englishForm === "sing") {
    return "an";
  }
  return englishArticles[articleForm][englishForm];
};

export default getEnglishArticle;
