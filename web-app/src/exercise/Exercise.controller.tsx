/** Local updates are done with these functions */

import { separateWordFromArticleRegex } from "./Exercise.constants";

import {
  exerciseResultVar,
  failedWordsVar,
  isAnswerCorrectVar,
  isCheckingAnswerVar,
  userTranslationVar,
  wordRankVar,
} from "../cache";
import { LANGUAGES } from "../config/constants";
import { ExerciseWord } from "../graphql/types";

const checkUserTranslation = (
  userTranslation: string,
  exerciseWord: ExerciseWord
): boolean => {
  const { answers, form, language } = exerciseWord;
  let isUserTranslationCorrect = false;

  // special case for english plurals : accepts correct answer
  // even if the article is not provided
  if (form === "plural" && language === LANGUAGES.English) {
    const correctTranslationsWithoutArticles = getTranslationsWithoutArticles(
      answers
    );
    correctTranslationsWithoutArticles.forEach((correctTranslation) => {
      if (correctTranslation === userTranslation.trim()) {
        isUserTranslationCorrect = true;
      }
    });
  }

  // checks with articles
  answers.forEach((answer) => {
    if (answer === userTranslation.trim()) {
      isUserTranslationCorrect = true;
    }
  });

  return isUserTranslationCorrect;
};

export const continueWithNextWord = () => {
  const wordRank = wordRankVar();

  isAnswerCorrectVar(false);
  isCheckingAnswerVar(false);
  userTranslationVar("");
  wordRankVar(wordRank + 1);
};

const getTranslationsWithoutArticles = (translations: string[]) =>
  translations.map((translation) => {
    const match = translation.match(separateWordFromArticleRegex);
    return match?.[1];
  });

export const submitUserTranslation = (exerciseWord: ExerciseWord) => {
  const exerciseResult = exerciseResultVar();
  const failedWords = failedWordsVar();
  const userTranslation = userTranslationVar();
  const {
    answers,
    englishName,
    form,
    language,
    wordToTranslate,
  } = exerciseWord;

  const isUserTranslationCorrect = checkUserTranslation(
    userTranslation,
    exerciseWord
  );
  isAnswerCorrectVar(isUserTranslationCorrect);
  // display answer verification
  isCheckingAnswerVar(true);
  exerciseResultVar([
    ...exerciseResult,
    {
      englishName,
      form,
      isAnswerCorrect: isUserTranslationCorrect,
      language,
    },
  ]);

  // if wrong answer, adds word to failedWords for restitution in recap screen
  if (!isUserTranslationCorrect) {
    failedWordsVar([...failedWords, [wordToTranslate, answers[0]]]);
  }
};
