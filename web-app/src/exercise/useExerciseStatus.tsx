import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";

import { GET_EXERCISE_STATUS } from "./graphql/getExerciseStatus.graphql.local";

export enum ExerciseStatus {
  done,
  inProgress,
  toBegin,
}

const useExerciseStatus = () => {
  const [status, setStatus] = useState<ExerciseStatus>(ExerciseStatus.toBegin);
  const {
    data: { hasCompletedExercise, hasFetchedExercise },
  } = useQuery(GET_EXERCISE_STATUS);
  console.info(hasCompletedExercise, hasFetchedExercise);

  useEffect(() => {
    if (hasFetchedExercise) {
      if (hasCompletedExercise && status !== ExerciseStatus.done) {
        setStatus(ExerciseStatus.done);
      } else if (status !== ExerciseStatus.inProgress) {
        setStatus(ExerciseStatus.inProgress);
      }
    }
  }, [hasCompletedExercise, hasFetchedExercise, status]);

  return status;
};

export default useExerciseStatus;
