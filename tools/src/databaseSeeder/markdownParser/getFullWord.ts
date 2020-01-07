import fetchEnglishWords from "./english/fetchEnglishWords.function";
import fetchFrenchWords from "./french/fetchFrenchWords.function";
import markdownRegex from "./markdownRegex";
import Word from "../models/word.interface";

/**
 * gathers data from one markdown document
 */
const getFullWord = (document: string, lesson: string, topic: string): Word => {
  const {
    type: typeRegex,
    uniqueForm: uniqueFormRegex,
    englishName: englishNameRegex,
    frenchName: frenchNameRegex,
  } = markdownRegex;
  // general data : regex fetching
  const [type] = document.match(typeRegex);
  const [hasUniqueForm] = document.match(uniqueFormRegex);

  // English data
  const englishName = document.match(englishNameRegex);
  const englishWords = fetchEnglishWords(document); // gathering and validating data

  // French data
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
    throw new Error(
      `\\033[1;31m[getFullWord] Required parameter missing\\033[0;0m`
    );
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

export default getFullWord;
