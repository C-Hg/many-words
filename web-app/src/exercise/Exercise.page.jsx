import React from "react";
import { Redirect } from "react-router-dom";

import ExerciseNavbar from "./Exercise.navbar";
import ExerciseContainer from "./container/Exercise.container";
import ExerciseRecap from "./recap/ExerciseRecap.container";

import AppContainer from "../app/AppContainer.styled";
import VerticalFlexbox from "../components/div/VerticalFlexbox.styled";

const Exercise = (props) => {
  const { exercise } = props;
  const { redirect, redirectionTarget, words, status } = exercise;

  // TODO: use links instead of Redirect
  if (redirect) {
    return <Redirect to={redirectionTarget} />;
  }
  if (words) {
    return (
      <AppContainer withNavbar sand>
        <ExerciseNavbar />
        <VerticalFlexbox
          width="100%"
          height="100%"
          justifyContent="flex-start"
          sand
        >
          {status === "exercise" && <ExerciseContainer />}
          {status === "recap" && <ExerciseRecap />}
        </VerticalFlexbox>
      </AppContainer>
    );
  }
  // TODO: implement waiting animation
  return null;
};

Exercise.defaultProps = {
  exercise: {
    words: [],
  },
};

export default Exercise;
