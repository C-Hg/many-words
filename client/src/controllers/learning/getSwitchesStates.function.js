function getSwitchesStates(words) {
  let hasSingPlurSwitch = false;
  let hasMascFemSwitch = false;
  let hasDefiniteOrIndefiniteSwitch = false;

  for (const word of words) {
    if (hasDefiniteOrIndefiniteSwitch) break;
    if (word.hasUniqueForm) continue;
    if (word.type === "noun") {
      hasDefiniteOrIndefiniteSwitch = "definite";
      hasSingPlurSwitch = "singular";
    }
  }

  for (const word of words) {
    if (hasSingPlurSwitch) break;
    if (word.hasUniqueForm) continue;
    if (word.type === "adjective") {
      hasSingPlurSwitch = "singular";
      hasMascFemSwitch = "masculine";
    }
  }

  for (const word of words) {
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

  return [hasSingPlurSwitch, hasMascFemSwitch, hasDefiniteOrIndefiniteSwitch];
}

export default getSwitchesStates;
