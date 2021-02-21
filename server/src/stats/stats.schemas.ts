import { gql } from "apollo-server-express";
import { Request } from "express";

import FormResult from "./interfaces/formResult.interface";
import statsController from "./stats.controller";

import { User } from "../graphql/types";

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

  type LessonsGrades {
    green: Int!
    gold: Int!
  }
`;

export const resolvers = {
  Mutation: {
    updateStats: async (
      parent: Record<string, unknown>,
      { results }: { results: FormResult[] },
      { req }: { req: Request }
    ): Promise<User> => {
      return statsController.updateStats(req.ctx.user, results);
    },
  },
};
