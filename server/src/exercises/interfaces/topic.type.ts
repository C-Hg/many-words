import lessonsByTopic from "../data/lessonsByTopic";

export type Topic = keyof typeof lessonsByTopic;

// type guard
export const isTopic = (topic: string): topic is Topic => {
  return Object.keys(lessonsByTopic).includes(topic);
};
