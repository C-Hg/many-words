import { gql } from "@apollo/client";

const SET_LANGUAGE = gql`
  mutation setLanguage($language: Languages!) {
    setLanguage(language: $language) {
      success
      user {
        id
        language
      }
    }
  }
`;

export default SET_LANGUAGE;
