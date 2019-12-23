// fr.isLApostrophe and en.isArticleAn should be written ONLY IF TRUE
import regex from "./markdownRegex";
import { fetchEnWords } from "./functions/fetchEnWords.function";
import { fetchFrWords } from "./functions/fetchFrWords.function";

// this function is the main controller that retrieves data from a markdown document

const extractData = (document, lesson, topic) => {
  // general data : regex fetching
  const [type] = document.match(regex.type);
  const [hasUniqueForm] = document.match(regex.uniqueForm);

  // EN data
  const englishName = document.match(regex.englishName);
  const englishWords = fetchEnWords(document); // gathering and validating data

  // FR data
  const frenchName = document.match(regex.frenchName);
  const frenchWords = fetchFrWords(document);

  if (
    !englishWords ||
    !frenchWords ||
    !englishName ||
    !frenchName ||
    !type ||
    !lesson ||
    !topic
  ) {
    throw new Error(`\\033[1;31mRequired parameter missing\\033[0;0m`);
  }

  const newWord = {
    english: {
      name: englishName,
      words: englishWords,
    },
    french: {
      name: frenchName,
      words: frenchWords,
    },
    hasUniqueForm,
    lesson,
    topic,
    type,
  };
  return newWord;
};

export default extractData;
