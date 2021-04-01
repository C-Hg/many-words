import { gql } from "@apollo/client";

export const GET_IS_USER_CONNECTED = gql`
  query GetIsUserConnected {
    isUserConnected @client
  }
`;
