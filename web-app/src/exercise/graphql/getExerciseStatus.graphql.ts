import { gql } from "@apollo/client";

export const GET_EXERCISE_STATUS = gql`
  query GetExerciseStatus {
    hasCompletedExercise @client
    hasFetchedExercise @client
  }
`;
