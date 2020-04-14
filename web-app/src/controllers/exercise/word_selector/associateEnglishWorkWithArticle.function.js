const associateEnglishWordWithArticle = (enArticle, enWord) => {
  return enArticle === "" ? enWord : `${enArticle} ${enWord}`;
};

export default associateEnglishWordWithArticle;
