/* eslint-disable no-param-reassign */
// using the famous Fisher–Yates shuffle

const shuffleArray = array => {
  const element = array.length;
  let buffer;
  let randomIndex;

  while (element) {
    randomIndex = Math.floor(Math.random() * (element - 1));
    buffer = array[element];
    array[element] = array[randomIndex];
    array[randomIndex] = buffer;
  }

  return array;
};

export default shuffleArray;
