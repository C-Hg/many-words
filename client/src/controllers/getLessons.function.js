// return the language context identifier that is the lesson name in exercises
// and the difficulty index for all lessons of a subtheme

exports.getLessons = function(subtheme) {
  let lessons = [];
  switch (subtheme) {
    case "animals":
      lessons = [["animals_basics", 1], ["mammals", 2], ["birds", 3]];
      break;

    case "numbers":
      lessons = [["first_numbers", 1]];
      break;

    default:
      break;
  }
  return lessons;
};
