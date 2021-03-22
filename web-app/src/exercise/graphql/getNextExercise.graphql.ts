import { gql } from "@apollo/client";

// TODO: test with a basic exercise first
export const GET_NEXT_EXERCISE = gql`
  query GetNextExercise {
    exercise {
      id
      mode # quiz, learning or weak words in V2
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
