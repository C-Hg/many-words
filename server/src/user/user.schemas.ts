import { gql, makeExecutableSchema } from "apollo-server-express";
import { Request } from "express";

import lessonsByTopic from "../exercises/data/lessonsByTopic";
import wordCountByLesson from "../exercises/data/wordCountByLesson";
import { User, Lesson } from "../graphql/types";

const typeDefs = gql`
  type Query {
    user: User
  }

  type User {
    _id: String!
    email: String!
    stats: Stats
  }

  type Stats {
    lessons: LessonStats
    topics: String
    global: Stats
  }

  type LessonScore {
    ${Object.keys(wordCountByLesson).map((lesson) => `${lesson}: Int`)}
  }

  type LessonStats {
    ${Object.keys(lessonsByTopic).map((topic) => `${topic}: LessonScore`)}
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    user: (parent: {}, args: {}, { req }: { req: Request }): User => {
      if (!req.user) {
        throw new Error("user is undefined");
      }
      return req.user;
    },
  },
};

const userSchema = makeExecutableSchema({ typeDefs, resolvers });

export default userSchema;
