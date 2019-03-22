// using the famous Fisher–Yates shuffle

exports.shuffleArray = function(array) {
  let element = array.length;
  let buffer;
  let randomIndex;

  while (element) {
    randomIndex = Math.floor(Math.random() * element--);
    buffer = array[element];
    array[element] = array[randomIndex];
    array[randomIndex] = buffer;
  }

  return array;
};
