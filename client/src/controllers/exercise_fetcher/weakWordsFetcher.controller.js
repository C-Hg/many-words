import getWeakWords from "./get_lesson_data/getWeakWords.function";
import FrEnWordSelector from "./word_selector/wordSelector.function";

async function weakWordsFetcher(context, reference) {
  let weakWords = await getWeakWords(context, reference);
  return FrEnWordSelector(weakWords, false);
}

export default weakWordsFetcher;
