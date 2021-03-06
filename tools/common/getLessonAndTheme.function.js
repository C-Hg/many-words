module.exports = function getLessonAndTheme(path) {
  let lessonRegex = /\w+(?=\/[\w]+\.md)/gi;
  let themeRegex = /\w+(?=\/[\w]+\/[\w]+\.md)/gi;
  let lesson = path.match(lessonRegex);
  let theme = path.match(themeRegex);

  if (lesson === null || theme === null) {
    return [null, null];
  }

  return [lesson[0], theme[0]];
};
