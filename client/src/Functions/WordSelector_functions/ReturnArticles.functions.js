const frArticles = {
  definite: {
    masc_sing: "le",
    masc_plur: "les",
    fem_sing: "la",
    fem_plur: "les"
  },
  indefinite: {
    masc_sing: "un",
    masc_plur: "des",
    fem_sing: "une",
    fem_plur: "des"
  }
};

const enArticles = {
  definite: {
    sing: "the",
    plur: "the"
  },
  indefinite: {
    sing: "a",
    plur: ""
  }
};

exports.returnFrArticle = function(fr_form, articleForm, isLApostrophe) {
  if (
    isLApostrophe &&
    articleForm === "definite" &&
    (fr_form === "masc_sing" || fr_form === "fem_sing")
  ) {
    return "l'";
  } else {
    return frArticles[articleForm][fr_form];
  }
};

exports.returnEnArticle = function(en_form, articleForm, isAn) {
  if (isAn && articleForm === "indefinite" && en_form === "sing") {
    return "an";
  } else {
    return enArticles[articleForm][en_form];
  }
};
