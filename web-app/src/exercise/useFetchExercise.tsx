import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_EXERCISE_STATUS } from "./graphql/getExerciseStatus.graphql.local";
import { ExerciseStatus } from "./types/ExerciseStatus.enum";

import { exerciseResultVar, exerciseStatusVar } from "../cache";
import {
  useGetNextExerciseLazyQuery,
  useUpdateStatsMutation,
} from "../graphql/types";

const useFetchExercise = () => {
  const [saveResults] = useUpdateStatsMutation();
  const [fetch] = useGetNextExerciseLazyQuery();
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

    // Update the stats on the server once the exercise is completed
    const updateStats = async () => {
      await saveResults({
        variables: { results: exerciseResultVar() },
      });
      exerciseStatusVar(ExerciseStatus.resultSaved);
    };

    if (exerciseStatus === ExerciseStatus.completed) {
      updateStats();
    }

    if (exerciseStatus === ExerciseStatus.toBegin) {
      getExercise();
    }
  }, [exerciseStatus, fetch, saveResults]);
};

export default useFetchExercise;
