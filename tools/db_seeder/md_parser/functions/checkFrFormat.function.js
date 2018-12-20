// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required
// isLApostrophe is facultative, only registered when true, and tested with
// checkFrAlternative and fetchFrWords functions

// void objects are impossible because not returned from checkFrAlternative function
// checks that mutually exclusive properties are not present
exports.checkFrFormat = function(wordObject) {
  if (!wordObject.hasOwnProperty("acceptedForms")) {
    console.log("no 'acceptedForms' property in FR word object");
    return false;
  }
  if (
    (wordObject.hasOwnProperty("masc_sing") ||
      wordObject.hasOwnProperty("masc_plur") ||
      wordObject.hasOwnProperty("fem_sing") ||
      wordObject.hasOwnProperty("fem_plur")) &&
    wordObject.hasOwnProperty("uniqueForm")
  ) {
    console.log("error : a FR word cannot have a unique form AND another form");
    return false;
  }

  // checks that fields are not empty, and that properties other than unique form are not alone
  // checks that acceptedForms matches the registered forms
  if (wordObject.hasOwnProperty("masc_sing")) {
    if (
      !wordObject.hasOwnProperty("masc_plur") &&
      !wordObject.hasOwnProperty("fem_sing")
    ) {
      console.log("error : property masc_sing alone");
      return false;
    }
    if (
      !wordObject.acceptedForms.includes("masc_sing") ||
      wordObject.acceptedForms.length < 2
    ) {
      console.log("error : acceptedForms property not matching masc_sing");
      return false;
    }
    if (wordObject.masc_sing === "") {
      console.log("error : empty 'masc_sing' property");
      return false;
    }
  }

  if (wordObject.hasOwnProperty("fem_sing")) {
    if (
      !wordObject.hasOwnProperty("fem_plur") &&
      !wordObject.hasOwnProperty("masc_sing")
    ) {
      console.log("error : property fem_sing alone");
      return false;
    }
    if (
      !wordObject.acceptedForms.includes("fem_sing") ||
      wordObject.acceptedForms.length < 2
    ) {
      console.log("error on acceptedForms property");
      return false;
    }
    if (wordObject.fem_sing === "") {
      console.log("error : empty 'fem_sing' property");
      return false;
    }
  }

  if (wordObject.hasOwnProperty("masc_plur")) {
    if (
      !wordObject.hasOwnProperty("masc_sing") &&
      !wordObject.hasOwnProperty("fem_plur")
    ) {
      console.log("error : property masc_plur alone");
      return false;
    }
    if (
      !wordObject.acceptedForms.includes("masc_plur") ||
      wordObject.acceptedForms.length < 2
    ) {
      console.log("error on acceptedForms property");
      return false;
    }
    if (wordObject.masc_plur === "") {
      console.log("error : empty 'masc_plur' property");
      return false;
    }
  }

  if (wordObject.hasOwnProperty("fem_plur")) {
    if (
      !wordObject.hasOwnProperty("masc_plur") &&
      !wordObject.hasOwnProperty("fem_sing")
    ) {
      console.log("error : property fem_plur alone");
      return false;
    }
    if (
      !wordObject.acceptedForms.includes("fem_plur") ||
      wordObject.acceptedForms.length < 2
    ) {
      console.log("error on acceptedForms property");
      return false;
    }
    if (wordObject.fem_plur === "") {
      console.log("error : empty 'fem_plur' property");
      return false;
    }
  }

  if (wordObject.hasOwnProperty("uniqueForm")) {
    if (
      wordObject.acceptedForms[0] != "uniqueForm" ||
      wordObject.acceptedForms[0] > 1
    ) {
      console.log("error : acceptedForms not matching uniqueForm ");
      return false;
    }
    if (wordObject.uniqueForm === "") {
      console.log("error : empty 'uniqueForm' property");
      return false;
    }
  }
  return true;
};
