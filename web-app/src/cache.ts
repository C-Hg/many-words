import { InMemoryCache, makeVar } from "@apollo/client";

import { ExerciseStatus } from "./exercise/types/ExerciseStatus.enum";

export const exerciseStatusVar = makeVar(ExerciseStatus.toBegin);
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
