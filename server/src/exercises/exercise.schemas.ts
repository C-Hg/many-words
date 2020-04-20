import { gql } from "apollo-server-express";

import lessonsByTopic from "./data/lessonsByTopic";
import wordCountByLesson from "./data/wordCountByLesson";

export const typeDefs = gql`
  type EnglishForms {
    uniqueForm: String
    singular: String
    plural: String
  }

  type FrenchForms {
    uniqueForm: String
    singularMasculine: String
    singularFeminine: String
    pluralMasculine: String
    pluralFeminine: String
  }

  enum Forms {
    uniqueForm
    singular
    singularMasculine
    singularFeminine
    plural
    pluralMasculine
    pluralFeminine
  }

  enum Languages {
    english
    french
  }

  enum Lesson {
    ${Object.keys(wordCountByLesson)}
  }

  enum Topic {
    ${Object.keys(lessonsByTopic)}
  }

`;

// Provide resolver functions for your schema fields
export const resolvers = {};
