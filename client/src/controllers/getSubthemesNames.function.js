exports.getSubthemesNames = function(theme) {
  let subthemes = [];
  switch (theme) {
    case "nature":
      subthemes = ["animals", "earth", "landscapes"];
      break;

    default:
      break;
  }
  return subthemes;
};
