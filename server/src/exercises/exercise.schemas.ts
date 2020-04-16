import { gql, makeExecutableSchema } from "apollo-server-express";

import lessonsByTopic from "./data/lessonsByTopic";
import wordCountByLesson from "./data/wordCountByLesson";

const typeDefs = gql`

  enum Lessons {
    ${Object.keys(wordCountByLesson)}
  }

  enum Topics {
    ${Object.keys(lessonsByTopic)}
  }

`;

// Provide resolver functions for your schema fields
const resolvers = {};

const exerciseSchema = makeExecutableSchema({ typeDefs });

export default exerciseSchema;
