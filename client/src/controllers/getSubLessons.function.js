// return the language context identifier and the difficulty index for all sublessons of a lesson

exports.getSubLessons = function(lesson) {
  let subLessons = [];
  switch (lesson) {
    case "animals":
      subLessons = [["common_animals", 1], ["mammals", 2], ["birds", 3]];
      break;

    default:
      break;
  }
  return subLessons;
};
