import getLessonData from "./get_lesson_data/getLessonData.function";
import fr_en_wordSelector from "./word_selector/wordSelector.function";

async function exerciseFetcher(lessonName) {
  let lesson = await getLessonData(lessonName);
  return fr_en_wordSelector(lesson);
}

export default exerciseFetcher;
