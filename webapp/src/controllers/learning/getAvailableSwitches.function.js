const getAvailableSwitches = words => {
  let hasNumberSwitch = false;
  let hasGenderSwitch = false;
  let hasDefiniteSwitch = false;

  words.forEach(word => {
    if (word.type === "noun") {
      hasDefiniteSwitch = true;
      hasNumberSwitch = true;
    }
    if (word.type === "adjective") {
      hasNumberSwitch = true;
      hasGenderSwitch = true;
    }
  });

  return { hasNumberSwitch, hasGenderSwitch, hasDefiniteSwitch };
};

export default getAvailableSwitches;
