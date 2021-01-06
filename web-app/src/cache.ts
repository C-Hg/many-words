import { InMemoryCache, makeVar } from "@apollo/client";

import { ExerciseResult } from "./exercise/types/ExerciseResult.interface";
import { ExerciseStatus } from "./exercise/types/ExerciseStatus.enum";

export const exerciseResultVar = makeVar<ExerciseResult[]>([]);
export const exerciseStatusVar = makeVar(ExerciseStatus.toBegin);
export const failedWordsVar = makeVar<string[][]>([]);
export const isAnswerCorrectVar = makeVar(false);
export const isCheckingAnswerVar = makeVar(false);
export const userTranslationVar = makeVar("");
export const wordRankVar = makeVar(0);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        exerciseResult: {
          read() {
            return exerciseResultVar();
          },
        },
        exerciseStatus: {
          read() {
            return exerciseStatusVar();
          },
        },
        failedWords: {
          read() {
            return failedWordsVar();
          },
        },
        isAnswerCorrect: {
          read() {
            return isAnswerCorrectVar();
          },
        },
        isCheckingAnswer: {
          read() {
            return isCheckingAnswerVar();
          },
        },
        userTranslation: {
          read() {
            return userTranslationVar();
          },
        },
        wordRank: {
          read() {
            return wordRankVar();
          },
        },
      },
    },
  },
});

export default cache;
