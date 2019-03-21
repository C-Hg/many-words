import { shuffleArray } from "../../common/arrayShuffler.function";

function makeBatches(weak_words) {
  // make batches of 10 weak words,shuffle after splitting in 10 !

  let batches = [];
  while (weak_words.length) {
    batches.push(shuffleArray(weak_words.splice(0, 10)));
  }
  return batches;
}

export default makeBatches;
