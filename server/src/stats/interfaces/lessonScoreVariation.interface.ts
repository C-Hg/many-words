import { Lesson } from "../../graphql/types";

export type LessonScoreVariation = {
  lesson: Lesson;
  scoreVariation: number;
};
