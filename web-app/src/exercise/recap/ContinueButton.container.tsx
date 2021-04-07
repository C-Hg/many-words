import { useQuery } from "@apollo/client";
import React from "react";

import ContinueButtonLoading from "./ContinueButtonLoading.component";
import ContinueButtonReady from "./ContinueButtonReady.component";

import { GET_EXERCISE_STATUS } from "../graphql/getExerciseStatus.graphql.local";
import { ExerciseStatus } from "../types/ExerciseStatus.enum";

const ContinueButton = () => {
  const {
    data: { exerciseStatus },
  } = useQuery(GET_EXERCISE_STATUS);

  // the next lesson is not yet ready to be fetched, block the button
  const loading = exerciseStatus !== ExerciseStatus.resultSaved;

  return <>{loading ? <ContinueButtonLoading /> : <ContinueButtonReady />}</>;
};

export default ContinueButton;
