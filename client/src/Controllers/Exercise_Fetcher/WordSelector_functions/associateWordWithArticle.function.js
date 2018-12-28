exports.associateFrWordWithArticle = function(fr_article, fr_word) {
  if (fr_article === "l'" || fr_article === "") {
    return `${fr_article}${fr_word}`;
  }
  return `${fr_article} ${fr_word}`;
};

exports.associateEnWordWithArticle = function(en_article, en_word) {
  if (en_article === "") {
    return en_word;
  }
  return `${en_article} ${en_word}`;
};
