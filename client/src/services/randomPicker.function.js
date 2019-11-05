// pseudo-randomly chooses one element inside the array
const randomPicker = arrayOfChoices => {
  return arrayOfChoices[Math.floor(Math.random() * arrayOfChoices.length)];
};

export default randomPicker;
