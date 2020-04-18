import { gql } from "apollo-server-express";

import lessonsByTopic from "../exercises/data/lessonsByTopic";
import wordCountByLesson from "../exercises/data/wordCountByLesson";

export const typeDefs = gql`
  extend type User {
    stats: Stats
  }

  type Stats {
    lessons: LessonsStats
    # topics: Object
    global: GlobalStats
  }

  type GlobalStats {
    studiedLessons: Int
    greenLessons: Int
    goldLessons: Int
    studiedWords: Int
    greenWords: Int
    goldWords: Int
    globalProgress: Float
  }

  type LessonScore {
    ${Object.keys(wordCountByLesson).map((lesson) => `${lesson}: Int`)}
  }

  type LessonsStats {
    ${Object.keys(lessonsByTopic).map((topic) => `${topic}: LessonScore`)}
  }


`;

// Provide resolver functions for your schema fields
export const resolvers = {};
