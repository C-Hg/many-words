import { gql } from "@apollo/client";

const CREATE_WEB_USER = gql`
  mutation createWebUser {
    createWebUser {
      success
    }
  }
`;

export default CREATE_WEB_USER;
