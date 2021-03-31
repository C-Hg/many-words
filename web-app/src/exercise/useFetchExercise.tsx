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
  const [initialFetch, { called, refetch }] = useGetNextExerciseLazyQuery();
  const {
    data: { exerciseStatus },
  } = useQuery(GET_EXERCISE_STATUS);

  useEffect(() => {
    // Automatically fetch the new exercise when the variable is reset to "toBegin"
    const getExercise = async () => {
      let getNextExercise;
      if (refetch !== undefined) {
        getNextExercise = refetch;
      } else {
        getNextExercise = initialFetch;
      }
      await getNextExercise();
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
  }, [called, exerciseStatus, initialFetch, refetch, saveResults]);
};

export default useFetchExercise;
