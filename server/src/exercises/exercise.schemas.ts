import { gql } from "apollo-server-express";

import lessonsByTopic from "./data/lessonsByTopic";
import wordCountByLesson from "./data/wordCountByLesson";

export const typeDefs = gql`

  enum Lessons {
    ${Object.keys(wordCountByLesson)}
  }

  enum Topics {
    ${Object.keys(lessonsByTopic)}
  }

`;

// Provide resolver functions for your schema fields
export const resolvers = {};
