exports.extractData = function(document) {
  let lessonName = "";
  let lessonRegex = /(?<=Parent\slesson\s\:\n*)\w+/;
  lessonName = document.match(lessonRegex);
  return lessonName;
};
