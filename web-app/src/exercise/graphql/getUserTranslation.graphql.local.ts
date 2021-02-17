import { gql } from "@apollo/client";

export const GET_USER_TRANSLATION = gql`
  query GetUserTranslation {
    userTranslation @client
  }
`;
