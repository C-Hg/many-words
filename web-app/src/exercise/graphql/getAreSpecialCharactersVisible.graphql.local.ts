import { gql } from "@apollo/client";

export const GET_ARE_SPECIAL_CHARACTERS_VISIBLE = gql`
  query GetAreSpecialCharactersVisible {
    areSpecialCharactersVisible @client
  }
`;
