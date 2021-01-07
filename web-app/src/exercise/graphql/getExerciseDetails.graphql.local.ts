import { gql } from "@apollo/client";

export const GET_EXERCISE_DETAILS = gql`
  query GetExerciseDetails {
    isAnswerCorrect @client
    isCheckingAnswer @client
    userTranslation @client
    wordRank @client
  }
`;
