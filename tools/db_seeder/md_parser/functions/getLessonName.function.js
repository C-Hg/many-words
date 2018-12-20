exports.getLessonName = function(path) {
  let parentDirectoryRegex = /\w+(?=\/\w+\.md)/gi;
  let lessonName = path.match(parentDirectoryRegex);
  return lessonName;
};
