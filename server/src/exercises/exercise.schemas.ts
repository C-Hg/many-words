import { gql } from "apollo-server-express";

import lessonsByTopic from "./data/lessonsByTopic";
import wordCountByLesson from "./data/wordCountByLesson";

export const typeDefs = gql`
  extend type Query {
    # return words formatted for exercise
    exercise(id: Lesson!): [ExerciseWord]
  }

  type ExerciseWord {
    answers: [String]!
    englishName: String!
    lesson: Lesson!
    question: String!
    selectedForm: Forms!
    selectedLanguage: Languages!
    topic: Topic!
  }

  type Word {
    english: EnglishWordData!
    french: FrenchWordData!
    hasUniqueForm: Boolean!
    lesson: Lesson!
    topic: Topic!
    type: String!
    weakestForms: [FormStats]
  }

  type EnglishWordData {
    name: String!
    words: [EnglishWord]!
  }

  type EnglishWord {
    form: EnglishForms
    values: [String]!
  }

  type FrenchWordData {
    name: String!
    words: [FrenchWord]!
  }

  type FrenchWord {
    form: FrenchForms
    values: [String]!
  }

  enum EnglishForms {
    plural
    singular           
    uniqueForm 
  }

  enum FrenchForms {
    pluralFeminine
    pluralMasculine
    singularFeminine
    singularMasculine
    uniqueForm
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
