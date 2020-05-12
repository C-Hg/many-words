import { gql } from "apollo-server-express";
import { Request } from "express";

import FormResult from "./interfaces/formResult.interface";
import statsController from "./stats.controller";

import wordCountByLesson from "../exercises/data/wordCountByLesson";
import { User } from "../graphql/exercises.types";
import logger from "../utils/logger";

export const typeDefs = gql`
  extend type User {
    stats: Stats!
  }

  type Mutation {
    "update user stats after an exercise"
    updateStats(results: [FormResultInput]): User
  }

  input FormResultInput {
    englishName: String!
    form: Forms
    isAnswerCorrect: Boolean!
    language: Languages!
  }

  type FormStats {
    language: Languages!
    form: Forms!
    score: Float!
  }

  type Stats {
    global: GlobalStats!
    lessons: LessonsScores!
    topics: [TopicStats]!
  }

  type GlobalStats {
    globalProgress: Float!
    goldLessons: Int!
    goldWords: Int!
    greenLessons: Int!
    greenWords: Int!
    studiedLessons: Int!
    studiedWords: Int!
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
    updateStats: async (
      parent: {},
      { results }: { results: FormResult[] },
      { req }: { req: Request }
    ): Promise<User> => {
      // TODO: withUserDefinedMiddleware
      if (!req.user) {
        logger.error("[updateStats] user is undefined");
        throw new Error("[updateStats] user is undefined");
      }
      return statsController.updateStats(req.ctx.user, results);
    },
  },
};
