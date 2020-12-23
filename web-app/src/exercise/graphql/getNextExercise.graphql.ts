import { gql } from "@apollo/client";

// TODO: test with a basic exercise first
export const GET_NEXT_EXERCISE = gql`
  query GetNextExercise {
    exercise {
      _id
      type #learning, quiz or weak words, update the server
      data {
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
