import { InMemoryCache, makeVar } from "@apollo/client";

export const hasCompletedExerciseVar = makeVar(false);
export const hasFetchedExerciseVar = makeVar(false);

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        hasCompletedExercise: {
          read() {
            return hasCompletedExerciseVar();
          },
        },
        hasFetchedExercise: {
          read() {
            return hasFetchedExerciseVar();
          },
        },
      },
    },
  },
});

export default cache;
