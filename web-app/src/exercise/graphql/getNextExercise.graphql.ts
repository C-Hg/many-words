import gql from "graphql-tag";

export const GET_NEXT_EXERCISE = gql`
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
