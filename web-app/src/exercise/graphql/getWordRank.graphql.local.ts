import { gql } from "@apollo/client";

export const GET_WORD_RANK = gql`
  query GetWordRank {
    wordRank @client
  }
`;
