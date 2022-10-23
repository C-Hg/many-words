import { gql } from "@apollo/client";

const GET_IS_USER_CONNECTED = gql`
  query GetIsUserConnected {
    isUserConnected @client
  }
`;

export default GET_IS_USER_CONNECTED;
