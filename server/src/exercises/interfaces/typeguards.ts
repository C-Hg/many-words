import { EnglishNameForms, FrenchNameForms } from "./name.interface";

import { Topic, Lesson, Forms } from "../../graphql/exercises.types";
import lessonsByTopic from "../data/lessonsByTopic";
import wordCountByLesson from "../data/wordCountByLesson";

export const isEnglishNameForms = (form: Forms): form is EnglishNameForms => {
  return form === "singular" || form === "plural";
};

export const isFrenchNameForms = (form: Forms): form is FrenchNameForms => {
  return (
    form === "singularMasculine" ||
    form === "singularFeminine" ||
    form === "pluralMasculine" ||
    form === "pluralFeminine"
  );
};
export const isTopic = (topic: string): topic is Topic => {
  return Object.keys(lessonsByTopic).includes(topic);
};

export const isLesson = (lesson: string): lesson is Lesson => {
  return Object.keys(wordCountByLesson).includes(lesson);
};
