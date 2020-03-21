import logger from "../../logger";
import fetchEnglishWords from "./english/fetchEnglishWords.function";
import fetchFrenchWords from "./french/fetchFrenchWords.function";
import markdownRegex from "./markdownRegex";
import Word from "../../common/models/word.interface";
import WordModel from "../../common/models/word.model";

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
  if (!lesson || !topic) {
    throw new Error(`[getFullWord] Required parameter missing`);
  }

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
    logger.error(`[getFullWord] missing property, ${document}`);
  }

  // hasUniqueForm is optional in the markdown document, default to false
  const matchHasUniqueForm = document.match(uniqueFormRegex);
  const hasUniqueForm = matchHasUniqueForm !== null;

  // English data
  let englishWords
  let frenchWords
  try {
    englishWords = fetchEnglishWords(document); // gathering and validating data
    frenchWords = fetchFrenchWords(document);
  } catch (error) {
    logger.error(`[getFullWord] error while fetching words, ${document}`);
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
