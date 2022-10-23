import { useQuery } from "@apollo/client";
import React from "react";

import ExerciseContainer from "./container/Exercise.container";
import { GET_EXERCISE_STATUS } from "./graphql/getExerciseStatus.graphql.local";
import ExerciseRecap from "./recap/ExerciseRecap.container";
import { ExerciseStatus } from "./types/ExerciseStatus.enum";
import useFetchExercise from "./useFetchExercise";

const Exercise = () => {
  useFetchExercise();
  const {
    data: { exerciseStatus },
  } = useQuery(GET_EXERCISE_STATUS);

  return (
    <>
      {exerciseStatus === ExerciseStatus.inProgress && <ExerciseContainer />}
      {exerciseStatus !== ExerciseStatus.inProgress ? <ExerciseRecap /> : null}
      {/* TODO: implement waiting animation */}
    </>
  );
};

export default Exercise;
