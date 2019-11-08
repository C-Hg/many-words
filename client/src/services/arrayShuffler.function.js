/* eslint-disable no-param-reassign */
// using the famous Fisher–Yates shuffle

const shuffleArray = array => {
  let element = array.length;
  let buffer;
  let randomIndex;

  while (element) {
    element -= 1;
    randomIndex = Math.floor(Math.random() * element);
    buffer = array[element];
    array[element] = array[randomIndex];
    array[randomIndex] = buffer;
  }

  return array;
};

export default shuffleArray;
