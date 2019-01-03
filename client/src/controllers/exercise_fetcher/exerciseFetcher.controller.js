import getLessonData from "./get_lesson_data/getLessonData.function";
import FrEnWordSelector from "./word_selector/wordSelector.function";

async function exerciseFetcher(lessonName) {
  let lesson = await getLessonData(lessonName);
  return FrEnWordSelector(lesson);
}

export default exerciseFetcher;
