exports.getLessonsNames = function(theme) {
  let lessons = [];
  switch (theme) {
    case "nature":
      lessons = ["animals", "earth", "landscapes"];
      break;

    default:
      break;
  }
  return lessons;
};
