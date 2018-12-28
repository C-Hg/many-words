//pseudo-randomly chooses one element inside the array
exports.randomPicker = function(arrayOfChoices) {
  return arrayOfChoices[Math.floor(Math.random() * arrayOfChoices.length)];
};
