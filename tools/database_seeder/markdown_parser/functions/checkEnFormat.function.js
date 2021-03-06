// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required
// isArticleAn is facultative, only registered when true, and tested with
// checkEnAlternative and fetchEnWords functions

// void objects are impossible because not returned from checkEnAlternative function

exports.checkEnFormat = function(wordObject) {
  if (
    !wordObject.hasOwnProperty("acceptedForms") ||
    !wordObject.acceptedForms.length
  ) {
    console.error(
      "\033[1;31m" +
        "Error : no 'acceptedForms' property in EN word object" +
        "\033[0;0m"
    );
    return false;
  }
  if (
    (wordObject.hasOwnProperty("sing") || wordObject.hasOwnProperty("plur")) &&
    wordObject.hasOwnProperty("uniqueForm")
  ) {
    console.error(
      "\033[1;31m" +
        "Error : a EN word cannot have a unique form AND sing and/or plur form" +
        "\033[0;0m"
    );
    return false;
  }

  // checks that fields are not empty
  if (wordObject.hasOwnProperty("sing")) {
    if (!wordObject.hasOwnProperty("plur")) {
      console.error(
        "\033[1;31m" +
          "Error : property sing but no property plur" +
          "\033[0;0m"
      );
      return false;
    }
    if (
      !wordObject.acceptedForms.includes("sing") ||
      !wordObject.acceptedForms.includes("plur") ||
      wordObject.acceptedForms.length != 2
    ) {
      console.error(
        "\033[1;31m" +
          "Error : acceptedForms property not matching sing/plur" +
          "\033[0;0m"
      );
      return false;
    }
    if (wordObject.sing === "") {
      console.error(
        "\033[1;31m" + "Error : empty 'sing' property" + "\033[0;0m"
      );
      return false;
    }
  }

  // checks that mutually exclusive properties are not present
  // and that acceptedForms matches the registered forms
  if (wordObject.hasOwnProperty("plur")) {
    if (!wordObject.hasOwnProperty("sing")) {
      console.error(
        "\033[1;31m" + "Error : property plur but no propert sing" + "\033[0;0m"
      );
      return false;
    }
    if (wordObject.plur === "") {
      console.error(
        "\033[1;31m" + "Error : empty 'plur' property" + "\033[0;0m"
      );
      return false;
    }
  }
  if (wordObject.hasOwnProperty("uniqueForm")) {
    if (
      wordObject.acceptedForms[0] != "uniqueForm" ||
      wordObject.acceptedForms[0] > 1
    ) {
      console.error(
        "\033[1;31m" +
          "Error : acceptedForms not matching uniqueForm" +
          "\033[0;0m"
      );
      return false;
    }
    if (wordObject.uniqueForm === "") {
      console.error(
        "\033[1;31m" + "Error : empty 'uniqueForm' property" + "\033[0;0m"
      );
      return false;
    }
  }
  return true;
};
