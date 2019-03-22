function getSwitchesStates(words) {
  let hasSingPlurSwitch = false;
  let hasMascFemSwitch = false;
  let hasDefIndefSwitch = false;

  for (let word of words) {
    if (hasDefIndefSwitch) break;
    if (word.hasUniqueForm) continue;
    if (word.type === "noun") {
      hasDefIndefSwitch = "definite";
      hasSingPlurSwitch = "singular";
    }
  }

  for (let word of words) {
    if (hasSingPlurSwitch) break;
    if (word.hasUniqueForm) continue;
    if (word.type === "adjective") {
      hasSingPlurSwitch = "singular";
      hasMascFemSwitch = "masculine";
    }
  }

  for (let word of words) {
    if (hasMascFemSwitch) break;
    if (word.hasUniqueForm) continue;
    if (
      (word.fr[0].acceptedForms.includes("masc_sing") &&
        word.fr[0].acceptedForms.includes("fem_sing")) ||
      (word.fr[0].acceptedForms.includes("masc_plur") &&
        word.fr[0].acceptedForms.includes("fem_plur"))
    ) {
      hasMascFemSwitch = "masculine";
    }
  }

  return [hasSingPlurSwitch, hasMascFemSwitch, hasDefIndefSwitch];
}

export default getSwitchesStates;
