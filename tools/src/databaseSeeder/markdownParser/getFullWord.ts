import fetchEnglishWords from "./english/fetchEnglishWords.function";
import fetchFrenchWords from "./french/fetchFrenchWords.function";
import markdownRegex from "./markdownRegex";
import Word from "../models/word.interface";
import WordModel from "../models/word.model";

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

  let type;
  let englishName;
  let frenchName;
  try {
    const [matchType] = document.match(typeRegex);
    const [matchEnglishName] = document.match(englishNameRegex);
    const [matchFrenchName] = document.match(frenchNameRegex);
    type = matchType;
    englishName = matchEnglishName;
    frenchName = matchFrenchName;
  } catch (error) {
    console.error(`[getFullWord] missing property, ${document}`);
  }

  // hasUniqueForm is optional in the markdown document, default to false
  const matchHasUniqueForm = document.match(uniqueFormRegex);
  const hasUniqueForm = matchHasUniqueForm !== null;

  // English data
  const englishWords = fetchEnglishWords(document); // gathering and validating data
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

  const newWord = new WordModel({
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
  });
  return newWord;
};

export default getFullWord;
