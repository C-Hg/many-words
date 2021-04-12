import { useQuery } from "@apollo/client";
import { useEffect } from "react";

import { GET_EXERCISE_STATUS } from "./graphql/getExerciseStatus.graphql.local";
import { GET_NEXT_EXERCISE } from "./graphql/getNextExercise.graphql";
import { ExerciseStatus } from "./types/ExerciseStatus.enum";

import { apolloClient } from "../apolloClient";
import { exerciseResultVar, exerciseStatusVar } from "../cache";
import {
  useGetNextExerciseLazyQuery,
  useUpdateStatsMutation,
} from "../graphql/types";

const useFetchExercise = () => {
  const [saveResults] = useUpdateStatsMutation();
  const [initialFetch, { refetch }] = useGetNextExerciseLazyQuery();
  const {
    data: { exerciseStatus },
  } = useQuery(GET_EXERCISE_STATUS);

  useEffect(() => {
    // Automatically fetch the new exercise when the variable is reset to "toBegin"
    const getExercise = async () => {
      await apolloClient.query({
        fetchPolicy: "network-only",
        query: GET_NEXT_EXERCISE,
      });
      // TODO: error management
      // TODO @V2: exercise should continue on refresh, cache issue?
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
  }, [exerciseStatus, initialFetch, refetch, saveResults]);
};

export default useFetchExercise;
