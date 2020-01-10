// TODO: create interface for return type
const getLessonAndTopic = (path: string): { [key in string]: string } => {
  const lessonRegex = /\w+(?=\/[\w]+\.md)/gi;
  const topicRegex = /\w+(?=\/[\w]+\/[\w]+\.md)/gi;
  const matchedLesson = path.match(lessonRegex);
  const matchedTopic = path.match(topicRegex);

  if (matchedLesson === null || matchedTopic === null) {
    console.error(`${+""}`);
    throw new Error(
      `Error : cannot parse lesson or topic ${matchedLesson}, ${matchedTopic}`
    );
  }

  return { lesson: matchedLesson[0], topic: matchedTopic[0] };
};

export default getLessonAndTopic;
