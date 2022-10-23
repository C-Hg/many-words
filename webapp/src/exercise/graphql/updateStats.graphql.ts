import { gql } from "@apollo/client";

export const GET_EXERCISE_STATUS = gql`
  mutation UpdateStats($results: [ExerciseResultInput!]!) {
    updateStats(results: $results) {
      success
    }
  }
`;
