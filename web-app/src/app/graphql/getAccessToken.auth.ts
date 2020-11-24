import { gql } from "@apollo/client";

const GET_ACCESS_TOKEN_WEB = gql`
  query getAccessTokenWebUser {
    getAccessTokenWebUser {
      success
    }
  }
`;

export default GET_ACCESS_TOKEN_WEB;
