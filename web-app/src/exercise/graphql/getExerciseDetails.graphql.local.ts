import { gql } from "@apollo/client";

export const GET_EXERCISE_DETAILS = gql`
  query GetExerciseDetails {
    isCheckingAnswer @client
    userTranslation @client
    wordRank @client
  }
`;
