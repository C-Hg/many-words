import { Types } from "mongoose";

import exercisesService from "../../../exercises/exercises.service";
import { LANGUAGES } from "../../constants";
import FormStats from "../../interfaces/formStats.interface";
import { WordStats } from "../../interfaces/wordStats.interface";

/**
 * Creates a new wordStats object for a given word
 */
const createWordStats = async (
  userId: Types.ObjectId,
  englishName: string
): Promise<WordStats> => {
  const wordData = await exercisesService.findWordByEnglishName(englishName);

  // fills formsStats for each form of the word
  const englishFormsStats = wordData.english.words.map(({ form }) => ({
    form,
    language: LANGUAGES.English,
    score: 0,
  }));
  const frenchFormsStats = wordData.french.words.map(({ form }) => ({
    form,
    language: LANGUAGES.French,
    score: 0,
  }));
  const formsStats: FormStats[] = [...englishFormsStats, ...frenchFormsStats];
  const { lesson, topic } = wordData;

  // other data are completed by default
  const wordStats: WordStats = {
    userId,
    englishName,
    formsStats,
    lesson,
    topic,
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  };
  return wordStats;
};

export default createWordStats;
