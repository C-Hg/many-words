exports.getSubthemesNames = function(theme) {
  let subthemes = [];
  switch (theme) {
    case "nature":
      subthemes = ["animals", "earth", "landscapes"];
      break;

    case "education":
      subthemes = ["numbers", "school"];
      break;

    case "health":
      subthemes = ["food", "healthcare", "human body"];
      break;

    default:
      break;
  }
  return subthemes;
};
