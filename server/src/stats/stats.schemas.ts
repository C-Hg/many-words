import { gql } from "apollo-server-express";
import { Request } from "express";

import FormResult from "./interfaces/formResult.interface";
import statsController from "./stats.controller";
import statsService from "./stats.service";

import { CurriculumDocument } from "../exercises/types/curriculum.interface";
import { UpdateStatsMutationResponse } from "../graphql/types";

export const typeDefs = gql`
  extend type Query {
    curriculum: Curriculum!
  }

  type CurriculumStats {
    globalProgress: Float!
    goldLessons: Int!
    goldWords: Int!
    greenLessons: Int!
    greenWords: Int!
    studiedLessons: Int!
    studiedWords: Int!
  }

  input ExerciseResultInput {
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

  type Mutation {
    "update user stats after an exercise"
    updateStats(results: [ExerciseResultInput!]!): UpdateStatsMutationResponse!
      @loggedIn
  }

  type LessonsGrades {
    green: Int!
    gold: Int!
  }

  type Curriculum {
    id: String!
    stats: CurriculumStats! @loggedIn
  }

  type UpdateStatsMutationResponse {
    success: Boolean!
  }
`;

export const resolvers = {
  Mutation: {
    updateStats: async (
      _parent: Record<string, unknown>,
      { results }: { results: FormResult[] },
      { req }: { req: Request }
    ): Promise<UpdateStatsMutationResponse> => {
      try {
        await statsController.updateStats(req.ctx.user, results);
        return { success: true };
      } catch (error) {
        return { success: false };
      }
    },
  },
  Query: {
    curriculum: async (
      _parent: Record<string, unknown>,
      _args: Record<string, unknown>,
      { req }: { req: Request }
    ): Promise<CurriculumDocument> => {
      return statsService.getCurriculum(req.ctx.user.id);
    },
  },
};
