import { InMemoryCache, makeVar } from "@apollo/client";

import { ExerciseStatus } from "./exercise/types/ExerciseStatus.enum";

export const exerciseStatusVar = makeVar(ExerciseStatus.toBegin);
export const isAnswerCorrectVar = makeVar(false);
export const isCheckingAnswerVar = makeVar(false);
export const userTranslationVar = makeVar("");
export const wordRankVar = makeVar(0);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        exerciseStatus: {
          read() {
            return exerciseStatusVar();
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
