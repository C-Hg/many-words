exports.associateFrWordWithArticle = (frArticle, frWord) => {
  if (frArticle === "l'" || frArticle === "") {
    return `${frArticle}${frWord}`;
  }
  return `${frArticle} ${frWord}`;
};

exports.associateEnWordWithArticle = (enArticle, enWord) => {
  if (enArticle === "") {
    return enWord;
  }
  return `${enArticle} ${enWord}`;
};
