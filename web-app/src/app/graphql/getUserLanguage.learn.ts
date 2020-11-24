import { gql } from "@apollo/client";

const GET_USER_LANGUAGE = gql`
  query getUserLanguage {
    user {
      id
      language
    }
  }
`;

export default GET_USER_LANGUAGE;
