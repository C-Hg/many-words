import React from "react";

import ExerciseNavbar from "./Exercise.navbar";
import ExerciseContainer from "./container/Exercise.container";
import ExerciseRecap from "./recap/ExerciseRecap.container";
import useExerciseStatus, { ExerciseStatus } from "./useExerciseStatus";
import useFetchExercise from "./useFetchExercise";

import AppContainer from "../app/AppContainer.styled";

const Exercise = () => {
  // TODO: combine both hooks
  const status = useExerciseStatus();
  useFetchExercise(status);

  // TODO: implement waiting animation
  // TODO: common navbar
  return (
    <AppContainer withNavbar sand>
      {/* <ExerciseNavbar /> */}
      {status === ExerciseStatus.inProgress && <p>in progress</p>}
      {status === ExerciseStatus.done && <p>recap</p>}
      {/* {status === ExerciseStatus.inProgress && <ExerciseContainer />}
      {status === ExerciseStatus.done && <ExerciseRecap />} */}
    </AppContainer>
  );
};

export default Exercise;
