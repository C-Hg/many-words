const associateFrenchWordWithArticle = (frArticle, frWord) => {
  if (frArticle === "l'" || frArticle === "") {
    return `${frArticle}${frWord}`;
  }
  return `${frArticle} ${frWord}`;
};

export default associateFrenchWordWithArticle;
