exports.getSubthemesNames = function(theme) {
  let subthemes = [];
  switch (theme) {
    case "nature":
      subthemes = ["animals", "earth", "landscapes"];
      break;

    case "education":
      subthemes = ["numbers", "school"];
      break;

    default:
      break;
  }
  return subthemes;
};
