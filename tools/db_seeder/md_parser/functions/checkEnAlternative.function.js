const regex = require("../mdRegex");

exports.checkEnAlternative = function(altName, document) {
  let singRegex = regex["enSing" + altName];
  let plurRegex = regex["enPlur" + altName];
  let uniqueFormRegex = regex["enUnique" + altName];
  let acceptedForms = [];
  let result = {};

  let forms = [
    ["sing", singRegex],
    ["plur", plurRegex],
    ["uniqueForm", uniqueFormRegex]
  ];
  for (let [form, formRegex] of forms) {
    let match = document.match(formRegex);
    console.log(match[0]);
    if (match) {
      acceptedForms.push(form);
      result[form] = match[0];
    }
  }
  if (Object.keys(result).length) {
    result.acceptedForms = acceptedForms;
    return result;
  }
  return false;
};
