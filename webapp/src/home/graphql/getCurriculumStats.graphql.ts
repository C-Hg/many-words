import gql from "graphql-tag";

export const GET_CURRICULUM_STATS = gql`
  query GetCurriculumStats {
    curriculum {
      id
      stats {
        globalProgress
        goldLessons
        goldWords
        greenLessons
        greenWords
        studiedLessons
        studiedWords
      }
    }
  }
`;
