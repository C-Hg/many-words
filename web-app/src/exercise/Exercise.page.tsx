import React from "react";

import ExerciseNavbar from "./Exercise.navbar";
import ExerciseContainer from "./container/Exercise.container";
import ExerciseRecap from "./recap/ExerciseRecap.container";

import AppContainer from "../app/AppContainer.styled";
import useExerciseStatus, { ExerciseStatus } from "./useExerciseStatus";

const Exercise = () => {
  const status = useExerciseStatus();
  useFetchExercise(status);

  // TODO: implement waiting animation
  return (
    <AppContainer withNavbar sand>
      <ExerciseNavbar />
      {status === ExerciseStatus.inProgress && <ExerciseContainer />}
      {status === ExerciseStatus.done && <ExerciseRecap />}
    </AppContainer>
  );
};

export default Exercise;
