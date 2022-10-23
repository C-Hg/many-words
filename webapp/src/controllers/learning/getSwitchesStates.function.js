const getSwitchesStates = words => {
  let hasSingPlurSwitch = false;
  let hasMascFemSwitch = false;
  let hasDefiniteOrIndefiniteSwitch = false;

  words.forEach(word => {
    if (word.type === "noun") {
      hasDefiniteOrIndefiniteSwitch = true;
      hasSingPlurSwitch = true;
    }
    if (word.type === "adjective") {
      hasSingPlurSwitch = true;
      hasMascFemSwitch = true;
    }
  });

  return [hasSingPlurSwitch, hasMascFemSwitch, hasDefiniteOrIndefiniteSwitch];
};

export default getSwitchesStates;
