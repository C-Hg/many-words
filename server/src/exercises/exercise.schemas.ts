import { gql } from "apollo-server-express";

import lessonsByTopic from "./data/lessonsByTopic";
import wordCountByLesson from "./data/wordCountByLesson";

import { EnglishForms } from "../graphql/types";

export const typeDefs = gql`
  extend type Query {
    # return words formatted for exercise
    exercise(id: Lesson!): [Word]
  }

  type Word {
    english: EnglishWordData!
    french: FrenchWordData!
    hasUniqueForm: Boolean!
    lesson: Lesson!
    topic: Topic!
    type: String!
    weakestForms: [FormStats]!
  }

  type EnglishWordData {
    name: String!
    words: [EnglishWord]!
  }

  type EnglishWord {
    plural: String
    singular: String
    uniqueForm: String
  }


  type FrenchWordData {
    name: String!
    words: [FrenchWord]!
  }

  type FrenchWord {
    pluralFeminine: String
    pluralMasculine: String
    singularFeminine: String
    singularMasculine: String
    uniqueForm: String
  }

  enum Forms {
    plural
    pluralFeminine
    pluralMasculine
    singular
    singularFeminine
    singularMasculine
    uniqueForm
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
