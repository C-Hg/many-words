import { gql } from "apollo-server-express";

import wordCountByLesson from "../exercises/data/wordCountByLesson";

export const typeDefs = gql`
  extend type User {
    stats: Stats!
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

  """
  LessonsScores associates a score to each lesson id
  """
  type LessonsScores {
    ${Object.keys(wordCountByLesson).map((lesson) => `${lesson}: Float`)}
  }

  """
  TopicsStats aggregates the lessons' stats, by topic
  """
  type TopicStats {
    """
    the id of the topic
    """
    id: String!
    lessonsGrades: LessonsGrades!
  }

  type LessonsGrades {
    green: Int!
    gold: Int!
  }
`;

export const resolvers = {};
