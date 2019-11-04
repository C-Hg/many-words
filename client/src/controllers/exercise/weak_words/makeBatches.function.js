import shuffleArray from "../../../services/arrayShuffler.function";

const makeBatches = weakWords => {
  // make batches of 10 weak words,shuffle after splitting in 10 !

  const batches = [];
  while (weakWords.length) {
    batches.push(shuffleArray(weakWords.splice(0, 10)));
  }
  return batches;
};

export default makeBatches;
