import { gql } from "@apollo/client";

// this file has a .graphql.local extension so codegen ignores it
// otherwise we would be forced to declare the schema on the server
export const GET_EXERCISE_STATUS = gql`
  query GetExerciseStatus {
    exerciseStatus @client
  }
`;
