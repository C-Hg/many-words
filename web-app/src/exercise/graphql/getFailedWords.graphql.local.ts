import { gql } from "@apollo/client";

export const GET_FAILED_WORDS = gql`
  query GetFailedWords {
    failedWords @client
  }
`;
