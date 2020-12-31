import { useQuery } from "@apollo/client";
import React from "react";

import ExerciseNavbar from "./Exercise.navbar";
import ExerciseContainer from "./container/Exercise.container";
import { GET_EXERCISE_STATUS } from "./graphql/getExerciseStatus.graphql.local";
import ExerciseRecap from "./recap/ExerciseRecap.container";
import { ExerciseStatus } from "./types/ExerciseStatus.enum";
import useFetchExercise from "./useFetchExercise";

import AppContainer from "../app/AppContainer.styled";

const Exercise = () => {
  useFetchExercise();
  const {
    data: { exerciseStatus },
  } = useQuery(GET_EXERCISE_STATUS);

  // TODO: implement waiting animation
  // TODO: common navbar
  return (
    <AppContainer withNavbar sand>
      {/* <ExerciseNavbar /> */}
      {exerciseStatus === ExerciseStatus.inProgress && <ExerciseContainer />}
      {exerciseStatus === ExerciseStatus.done && <ExerciseRecap />}
    </AppContainer>
  );
};

export default Exercise;
