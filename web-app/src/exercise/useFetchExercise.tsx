import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_NEXT_EXERCISE } from "./graphql/getNextExercise.graphql";
import { ExerciseStatus } from "./useExerciseStatus";

import { hasFetchedExerciseVar } from "../cache";

const useFetchExercise = (status: ExerciseStatus) => {
  const [fetch] = useLazyQuery(GET_NEXT_EXERCISE);

  useEffect(() => {
    const getExercise = async () => {
      await fetch();
      hasFetchedExerciseVar(true);
    };

    if (status === ExerciseStatus.toBegin && !hasFetchedExerciseVar()) {
      getExercise();
      // TODO: update exercise query properly
    }
  }, [fetch, status]);
};

export default useFetchExercise;
