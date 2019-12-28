// TODO: create interface for return type
const getLessonAndTopic = (path: string) => {
  const lessonRegex = /\w+(?=\/[\w]+\.md)/gi;
  const topicRegex = /\w+(?=\/[\w]+\/[\w]+\.md)/gi;
  const matchedLesson = path.match(lessonRegex);
  const matchedTopic = path.match(topicRegex);

  if (matchedLesson === null || matchedTopic === null) {
    console.error(`${+""}`);
    throw new Error(
      `\\033[1;31mError : cannot parse lesson or topic ${matchedLesson}, ${matchedTopic}\\033[0;0m`
    );
  }

  return { lesson: matchedLesson[0], topic: matchedTopic[0] };
};

export default getLessonAndTopic;
