import { gql } from "apollo-server-express";
import { Request } from "express";

import lessonsByTopic from "./data/lessonsByTopic";
import wordCountByLesson from "./data/wordCountByLesson";
import exercisesController from "./exercises.controller";

import { Exercise } from "../graphql/types";

export const typeDefs = gql`
  extend type Query {
    # return words formatted for exercise
    exercise: Exercise! @loggedIn
  }

  extend type User {
    selectedCurriculumId: String! @loggedIn
  }

  type Exercise {
    id: String!
    type: String!
    words: [ExerciseWord]!
  }

  type ExerciseWord {
    # all accepted translations for this word
    answers: [String!]!
    englishName: String!
    # the form of the word to translate
    form: Forms!
    # the language of the word to translate
    language: Languages!
    lesson: Lesson!
    topic: Topic!
    wordToTranslate: String!
  }

  type Word {
    english: WordData!
    french: WordData!
    hasUniqueForm: Boolean!
    lesson: Lesson!
    topic: Topic!
    # TODO: strong typing for types
    type: String!
    weakestForms: [FormStats]!
  }

  type WordData {
    name: String!
    words: [FormValue!]!
  }

  type FormValue {
    form: Forms!
    values: [String!]!
  }

  enum CurriculumNames {
    frenchEnglish
  }

  enum ExerciseTypes {
    learn
    quiz
    review
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
export const resolvers = {
  Query: {
    exercise: async (
      parent: Record<string, unknown>,
      args: Record<string, unknown>,
      { req }: { req: Request }
    ): Promise<Exercise> => {
      return exercisesController.getNextExercise(req.ctx.user);
    },
  },
};
