import { useLazyQuery, useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_EXERCISE_STATUS } from "./graphql/getExerciseStatus.graphql.local";
import { GET_NEXT_EXERCISE } from "./graphql/getNextExercise.graphql";
import { ExerciseStatus } from "./types/ExerciseStatus.enum";

import { exerciseStatusVar } from "../cache";

const useFetchExercise = () => {
  const [fetch] = useLazyQuery(GET_NEXT_EXERCISE);
  const {
    data: { exerciseStatus },
  } = useQuery(GET_EXERCISE_STATUS);

  useEffect(() => {
    // Automatically fetch the new exercise when the variable is reset to "toBegin"
    const getExercise = async () => {
      await fetch();
      // TODO: error management
      exerciseStatusVar(ExerciseStatus.inProgress);
    };

    if (exerciseStatus === ExerciseStatus.toBegin) {
      getExercise();
    }
  }, [exerciseStatus, fetch]);
};

export default useFetchExercise;
