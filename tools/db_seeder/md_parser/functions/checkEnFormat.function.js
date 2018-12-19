// this function checks that the informations retrieved from the markdown file
// are not mutually exclusive for a specific word
// the property acceptedForms is required

// void objects are impossible because not returned from checkEnAlternative function

exports.checkEnFormat = function(wordObject) {
  if (
    !wordObject.hasOwnProperty("acceptedForms") ||
    !wordObject.acceptedForms.length
  ) {
    console.log("no 'acceptedForms' property in EN word object");
    return false;
  }
  if (
    (wordObject.hasOwnProperty("sing") || wordObject.hasOwnProperty("plur")) &&
    wordObject.hasOwnProperty("uniqueForm")
  ) {
    console.log(
      "error : a EN word cannot have a unique form AND sing and/or plur form"
    );
    return false;
  }

  // checks that fields are not empty
  if (wordObject.hasOwnProperty("sing")) {
    if (!wordObject.hasOwnProperty("plur")) {
      console.log("error : property sing but no property plur");
      return false;
    }
    if (
      !wordObject.acceptedForms.includes("sing") ||
      !wordObject.acceptedForms.includes("plur") ||
      wordObject.acceptedForms.length != 2
    ) {
      console.log("error : acceptedForms property not matching sing/plur");
      return false;
    }
    if (wordObject.sing === "") {
      console.log("error : empty 'sing' property");
      return false;
    }
  }

  // checks that mutually exclusive properties are not present
  // and that acceptedForms matches the registered forms
  if (wordObject.hasOwnProperty("plur")) {
    if (!wordObject.hasOwnProperty("sing")) {
      console.log("error : property plur but no propert sing");
      return false;
    }
    if (wordObject.plur === "") {
      console.log("error : empty 'plur' property");
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
