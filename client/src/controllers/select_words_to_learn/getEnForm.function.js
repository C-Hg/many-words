exports.getEnForm = function(singOrPlur, acceptedForms) {
  let enForm = acceptedForms[0];
  if (acceptedForms.includes("sing") && singOrPlur === "singular") {
    enForm = "sing";
  }

  if (acceptedForms.includes("plur") && singOrPlur === "plural") {
    enForm = "plur";
  }

  return enForm;
};
