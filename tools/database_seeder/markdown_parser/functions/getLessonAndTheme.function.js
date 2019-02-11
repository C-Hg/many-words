exports.getLessonAndTheme = function(path) {
  let lessonRegex = /\w+(?=\/[\w]+\.md)/gi;
  let themeRegex = /\w+(?=\/[\w]+\/[\w]+\.md)/gi;
  let lesson = path.match(lessonRegex);
  let theme = path.match(themeRegex);

  return [lesson[0], theme[0]];
};
