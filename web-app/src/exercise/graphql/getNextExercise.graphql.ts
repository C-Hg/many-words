import { gql } from "@apollo/client";

// TODO: test with a basic exercise first
export const GET_NEXT_EXERCISE = gql`
  query GetNextExercise {
    exercise {
      id
      type #learning, quiz or weak words, update the server
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
