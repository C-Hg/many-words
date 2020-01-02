import fetchEnglishWords from "./english/fetchEnglishWords.function";
import fetchFrenchWords from "./french/fetchFrenchWords.function";
import markdownRegex from "./constantRegex";
import Word from "../../common/models/word.interface";

// this function is the main controller that retrieves data from a markdown document

const extractData = (document: string, lesson: string, topic: string): Word => {
  const {
    type: typeRegex,
    uniqueForm: uniqueFormRegex,
    englishName: englishNameRegex,
    frenchName: frenchNameRegex,
  } = markdownRegex;
  // general data : regex fetching
  const [type] = document.match(typeRegex);
  const [hasUniqueForm] = document.match(uniqueFormRegex);

  // EN data
  const englishName = document.match(englishNameRegex);
  const englishWords = fetchEnglishWords(document); // gathering and validating data

  // FR data
  const frenchName = document.match(frenchNameRegex);
  const frenchWords = fetchFrenchWords(document);

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
