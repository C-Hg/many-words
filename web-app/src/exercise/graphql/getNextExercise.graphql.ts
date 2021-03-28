import gql from "graphql-tag";

export const GET_USER_TRANSLATION = gql`
  query GetNextExercise {
    exercise {
      id
      mode
      words {
        answers
        englishName
        form
        language
        lesson
        topic
        wordToTranslate
      }
    }
  }
`;
