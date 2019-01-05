// return the language context identifier and the difficulty index for all sublessons of a lesson

exports.getLessons = function(subtheme) {
  let lessons = [];
  switch (subtheme) {
    case "animals":
      lessons = [["common_animals", 1], ["mammals", 2], ["birds", 3]];
      break;

    default:
      break;
  }
  return lessons;
};
