import { gql } from "apollo-server-express";
import { Request } from "express";

import FormResult from "./interfaces/formResult.interface";
import statsController from "./stats.controller";

import wordCountByLesson from "../exercises/data/wordCountByLesson";
import { User } from "../graphql/types";

export const typeDefs = gql`
  extend type User {
    stats: Stats!
  }

  type Mutation {
    updateStats(results: [FormResultInput]): Stats
  }

  input FormResultInput {
    englishName: String!
    form: Forms
    isAnswerCorrect: Boolean!
    language: Languages!
  }

  type Stats {
    lessons: LessonsScores!
    topics: [TopicStats]!
    global: GlobalStats!
  }

  type GlobalStats {
    studiedLessons: Int!
    greenLessons: Int!
    goldLessons: Int!
    studiedWords: Int!
    greenWords: Int!
    goldWords: Int!
    globalProgress: Float!
  }


  "LessonsScores associates a score to each lesson id"
  type LessonsScores {
    ${Object.keys(wordCountByLesson).map((lesson) => `${lesson}: Float`)}
  }

  "TopicsStats aggregates the lessons' stats, by topic"
  type TopicStats {
    id: String!
    lessonsGrades: LessonsGrades!
  }

  type LessonsGrades {
    green: Int!
    gold: Int!
  }
`;

export const resolvers = {
  Mutation: {
    updateStats: (
      parent: {},
      { results }: { results: FormResult[] },
      { req }: { req: Request }
    ): User => {
      if (!req.user) {
        throw new Error("user is undefined");
      }
      return statsController.updateStats(req.user, results);
    },
  },
};
